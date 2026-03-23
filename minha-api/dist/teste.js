const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'alice@prisma.io',
            name: 'Alice',
        },
    });
    console.log(user);
}
main();
export {};
//# sourceMappingURL=teste.js.map