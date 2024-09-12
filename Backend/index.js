const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');  // or you can use express.json() and express.urlencoded() for parsing
const crypto = require('crypto');
const cors = require('cors'); // Import the cors package
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Port = 8090;
const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); // Enable CORS for all routes


app.use(cors({
    origin: 'http://localhost:2001' // Replace with your client's origin
}));




// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'e_commerce'
});

// Connect to the database
db.connect((error) => {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Database connected');
});



// Utility function to hash a password using MD5
function md5Hash(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

// API endpoint to check username and password
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Hash the provided password
    const hashedPassword = md5Hash(password);

    // SQL query to check username and password
    let query = `
        SELECT Username 
        FROM Users 
        WHERE Username = ? 
          AND Password = ?
    `;
    db.query(query, [username, hashedPassword], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while fetching data');
            return;
        }

        if (results.length > 0) {
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    });
});

// Signup API endpoint
app.post('/signup', (req, res) => {
    const { username, password, emailaddress, fullname, phonenumber, dateofbirth } = req.body;


    // Log the request body to debug
    console.log('Request body:', req.body);

    // Check if all required fields are provided
    if (!username || !password || !emailaddress || !fullname || !phonenumber || !dateofbirth) {
        return res.status(400).send('All fields are required');
    }

    // Hash the password
    const hashedPassword = md5Hash(password);

    let query = "INSERT INTO users (username, password, emailaddress, fullname, phonenumber, dateofbirth) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [username, hashedPassword, emailaddress, fullname, phonenumber, dateofbirth], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('An error occurred while inserting data');
            return;
        }
        res.send('Signup successful');
    });
});

//Products data 
//get product all data
app.get("/product", (req, res) => {
    const query = "select * from products";
    db.query(query, (err, result) => {
        console.log("This is product list " + result);
        if (err) throw err;
        res.send(result);

    })
})


//Get product with id
app.get("/product/:id", (req, res) => {
    const productId = req.params.id;
    const query = "select * from products where id=?"
    db.query(query, [productId], (err, result) => {
        if (err) {
            console.error("Error fetching id: ", err);
            return res.status(500).send('Failed to fetch Product id')
        }
        if (result.length === 0) {
            // No product found with the provided ID
            return res.status(404).send('Product not found');
        }

        // Product found, send it as a response
        res.status(200).json(result[0]);
        console.log(result);

    })
})

// Logic of adding image path instead of blob 
const source='src/assets/images/products';
const uploadDir = path.join(__dirname,source );
// Serve static files from the 'assets/images/products' directory
app.use('/assets/images/products', express.static(path.join(__dirname, source)));
// Function to ensure the directory exists
const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Ensure the directory exists when starting the server
ensureDirectoryExistence(uploadDir);

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        ensureDirectoryExistence(uploadDir); // Ensure the directory exists
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage: storage });

// app.post("/Addproduct", upload.single('item_image'), (req, res) => {
//     const { product_name, description, price, discount, item_category, brand, quantity } = req.body;

//     // File information
//     const item_image = req.file ? req.file.filename : null; // Get the file name

//     if (!product_name || !description || !price || !discount || !item_category || !item_image || !brand || !quantity) {
//         return res.status(400).send({ message: "All fields are required, including an image." });
//     }

//     const query = "INSERT INTO products (product_name, description, price, discount, item_category, item_image, brand, quantity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

//     db.query(
//         query,
//         [product_name, description, price, discount, item_category, item_image, brand, quantity],
//         (err, result) => {
//             if (err) {
//                 console.error("Error adding product: ", err);
//                 return res.status(500).send({ message: "Failed to add product.", error: err });
//             }

//             console.log("Product added successfully:", result);
//             res.status(201).send({ message: "Product added successfully.", productId: result.insertId });
//         }
//     );
// });



// creating API for catagories



// Get all categories

app.post("/Addproduct", upload.single('item_image'), (req, res) => {
    const { product_name, description, price, discount, item_category, brand, quantity, subcategory_id } = req.body;

    // File information
    const item_image = req.file ? req.file.filename : null; // Get the file name

    if (!product_name || !description || !price || !discount || !item_category || !item_image || !brand || !quantity || !subcategory_id) {
        return res.status(400).send({ message: "All fields are required, including an image and subcategory." });
    }

    const query = `
      INSERT INTO products (product_name, description, price, discount, item_category, item_image, brand, quantity, subcategory_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [product_name, description, price, discount, item_category, item_image, brand, quantity, subcategory_id],
        (err, result) => {
            if (err) {
                console.error("Error adding product: ", err);
                return res.status(500).send({ message: "Failed to add product.", error: err });
            }

            console.log("Product added successfully:", result);
            res.status(201).send({ message: "Product added successfully.", productId: result.insertId });
        }
    );
});



app.get('/getcategory', (req, res) => {
  const sql = 'SELECT * FROM categories';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Create a new category
app.post('/addcategory', (req, res) => {
  const { name } = req.body;
  const sql = 'INSERT INTO categories (name) VALUES (?)';
  db.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).send({ message: 'Category created successfully', id: result.insertId });
    }
  });
});
// Get a specific category by ID
app.get('/category/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const sql = 'SELECT * FROM categories WHERE id = ?';
  db.query(sql, [categoryId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});


// Update a category
app.put('/updatecategory/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const sql = 'UPDATE categories SET name = ? WHERE id = ?';
  db.query(sql, [name, categoryId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Category updated successfully' });
    }
  });
});

// Delete a category
app.delete('/deletecategory/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const sql = 'DELETE FROM categories WHERE id = ?';
  db.query(sql, [categoryId], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Category deleted successfully' });
    }
  });
});

// Get all subcategories of a specific category
app.get('/:categoryName/subcategories', (req, res) => {
  const { categoryName } = req.params;

  // First, get the category ID based on the category name
  const getCategoryIdQuery = 'SELECT id FROM categories WHERE name = ?';

  db.query(getCategoryIdQuery, [categoryName], (err, categoryResults) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (categoryResults.length === 0) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const categoryId = categoryResults[0].id;

    // Then, get the subcategories based on the category ID
    const getSubcategoriesQuery = 'SELECT * FROM subcategories WHERE category_id = ?';

    db.query(getSubcategoriesQuery, [categoryId], (err, subcategoryResults) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(subcategoryResults);
    });
  });
});


// Get a specific subcategory by ID under a specific category
app.get('/category/:categoryId/subcategories/:subcategoryId', (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  const sql = 'SELECT * FROM subcategories WHERE category_id = ? AND id = ?';
  db.query(sql, [categoryId, subcategoryId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

// Create a new subcategory for a specific category
// app.post('/:categoryId/subcategories', (req, res) => {
//   const { categoryId } = req.params;
//   const { name } = req.body;
//   const sql = 'INSERT INTO subcategories (name, category_id) VALUES (?, ?)';
//   db.query(sql, [name, categoryId], (err, result) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.status(201).json({ message: 'Subcategory created successfully', id: result.insertId });
//     }
//   });
// });

// Update a subcategory
// app.put('/:categoryId/subcategories/:subcategoryId', (req, res) => {
//   const { subcategoryId } = req.params;
//   const { name } = req.body;
//   const sql = 'UPDATE subcategories SET name = ? WHERE id = ?';
//   db.query(sql, [name, subcategoryId], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json({ message: 'Subcategory updated successfully' });
//     }
//   });
// });

// Delete a subcategory
// app.delete('/:categoryId/subcategories/:subcategoryId', (req, res) => {
//   const { subcategoryId } = req.params;
//   const sql = 'DELETE FROM subcategories WHERE id = ?';
//   db.query(sql, [subcategoryId], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.json({ message: 'Subcategory deleted successfully' });
//     }
//   });
// });




// Get products by subcategory name
app.get('/products/:subcategoryName', (req, res) => {
    const { subcategoryName } = req.params;
    const sql = `
    SELECT p.id, p.product_name, p.description, p.price
    FROM products p
    JOIN subcategories s ON p.subcategory_id = s.id
    WHERE s.name = ?;
  `;
  
    db.query(sql, [subcategoryName], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });
  

// Start the server
app.listen(Port, () => {
    console.log(`Server started on port ${Port}`);
});
