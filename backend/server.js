const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our e-commerce API!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});