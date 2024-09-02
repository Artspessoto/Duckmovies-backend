const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const z = require("zod");

const CreateUserPayload = z.object({
  email: z
    .string()
    .email("O formato do e-mail é inválido")
    .min(8, "O e-mail deve conter pelo menos 8 caracteres")
    .max(254, "O e-mail pode conter no máximo 254 caracteres"),
  name: z
    .string()
    .min(2, "O nome deve conter pelo menos 2 caracteres")
    .max(50, "O nome pode conter no máximo 50 caracteres"),
  password: z
    .string()
    .min(6, "A senha deve conter pelo menos 6 caracteres")
    .max(12, "A senha pode conter no máximo 12 caracteres"),
});

const UpdateUserPayload = z.object({
  password: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value) {
          return value.length >= 6 && value.length <= 12;
        }
        return true;
      },
      {
        message: "Nova senha obrigatória (6-12 caracteres)",
      }
    ),
});

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const { success, error } = CreateUserPayload.safeParse({
      name,
      email,
      password,
    });

    if (!success) throw new AppError(error.errors.map((err) => err.message));

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) throw new AppError("Este e-mail já está em uso.");

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const { success, error } = UpdateUserPayload.safeParse({
      name,
      email,
      password,
      old_password,
    });

    if (!success) throw new AppError(error.errors.map((err) => err.message));

    const user_id = req.user.id;
    const user = await knex("users").where({ id: user_id }).first();

    if (!user) throw new AppError("Usuário não encontrado", 404);

    const userWithUpdateEmail = await knex("users").where({ email }).first();

    if (userWithUpdateEmail && userWithUpdateEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) throw new AppError("A senha antiga não confere");

      user.password = await hash(password, 8);
    }

    await knex("users")
      .update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.raw("CURRENT_TIMESTAMP"),
      })
      .where({ id: user_id });

    return res.status(200).json();
  }
}

module.exports = UserController;
