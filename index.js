const express = require('express');
const bodyParser = require('body-parser');
const { learn, Sequelize } = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());
learn.sync()
.then(()=>{
  console.log('Success')
})
.catch(error=>
{
  console.error('error syncing database:',error);
});

// Create a new user with predefined values
app.get('/user', async (req, res) => {
  try {
    const user = await learn.create({
      firstName: 'Priya',
      lastName: 'MariaDhas',
      email: 'mpriyad2001@gmail.com'
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/use', async (req, res) => {
  try {
    const use = await learn.bulkCreate(
      [
        {
          firstName: 'Ashi',
          lastName: 'MariaDhas',
          email: 'ashi@gmail.com'
        },
        {
          firstName: 'Sneha',
          lastName: 'MariaDhas',
          email: 'sneha@gmail.com'
        },
        {
          firstName: 'Anitha MD',
          lastName: 'MariaDhas',
          email: 'anitha@gmail.com'
        }
      ],
      { ignoreDuplicates: true }
    );
    res.status(201).json(use);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await learn.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const user = await learn.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get ('/update',(req,res)=>
{
learn.update({firstName:"Maha"},{
  where :{
    id:40
  }})
  learn.destroy({where:{id:42}}
  );
});
app.get('/count',(req,res)=>
{
  learn.findAndCountAll({
    where:
    {
      firstName:{
        [Sequelize.Op.like]: '%a'}
      }
    },{limit:50,offset:0}
  )
  .then(result=>
  {
    console.log('Total number of users:',result.count);
    console.log('Users:', JSON.stringifytringify(result.rows,null,2));
  })
  .catch(error =>
  {
    console.error('Error fetching users:',error);
  })
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
