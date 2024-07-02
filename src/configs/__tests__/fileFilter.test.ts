import {describe, it, vi, expect} from "vitest";
import {fileFilter} from "../fileFilter";


describe("File Filter", () => {
    it('should not be valid for a .js file', () => {
        const spy = vi.fn()
        const file = {
            originalname: 'file.js'
        }

        fileFilter(null, file, spy)

        expect(spy).toBeCalledWith({
            "message": "Apenas imagens com extensão jpeg, jpg, png ou gif são permitidas.",
            "statusCode": 401,
        })
    });
})
