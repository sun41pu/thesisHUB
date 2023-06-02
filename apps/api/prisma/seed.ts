import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const roles = await prisma.userRoles.createMany({
    data: [
      { name: 'STUDENT'},
      { name: 'PROFESSOR'},
      { name: 'ADMIN'},
    ]
  })

  const statuses = await prisma.thesisStatus.createMany({
    data: [
      { name: 'DRAFT'},
      { name: 'PUBLISHED'},
      { name: 'APPROVED'},
      { name: 'REJECTED'},
    ]
  })

  const tags = await prisma.tags.createMany({
    data: [
      { tag: "Информационные системы и технологии"},
      { tag: "Сети коммуникации" },
      { tag: "Программирование"},
      { tag: "тест"},
      ]
  })


  console.log("SEEDING COMPLETED, CREATED", roles, statuses, tags)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
