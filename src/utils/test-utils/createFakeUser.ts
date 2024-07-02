export function createFakeUser() {
    const id = crypto.randomUUID();
    return {
        id: id,
        email: `vilasesamo-${id}@gmail.com`,
        password: "garibaldinho123",
    };
}
