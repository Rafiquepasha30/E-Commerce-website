// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const DB = process.env.MONGODB_URI || 'mongodb+srv://rafiquepasha:Rafiquepasha@cluster0.aeov2ym.mongodb.net/e-commerce';
mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define storage engine for multer
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});
const upload = multer({
    storage: storage
});

// Serve static files
app.use('/images', express.static('upload/images'));

// Define Product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose.model("Product", ProductSchema);

// Define User schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    cartData: {
        type: Object
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User", UserSchema);

// Routes

app.get("/", (req, res) => {
    res.send("Express app is running");
});

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});

// Add product
app.post('/addproduct', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        console.log("Product saved");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// Remove product
app.post('/removeproduct', async (req, res) => {
    try {
        await Product.findOneAndDelete({
            _id: req.body.id
        });
        console.log("Product removed");
        res.json({
            success: true,
            name: req.body.name
        });
    } catch (err) {
        console.error("Error removing product:", err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// Get all products
app.get('/allproducts', async (req, res) => {
    try {
        const products = await Product.find({});
        console.log("All products fetched");
        res.json(products);
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// User registration
app.post('/signup', async (req, res) => {
    try {
        const {
            username,
            email,
            password
        } = req.body;
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                success: false,
                error: "Existing user"
            });
        }
        // Create cart data
        let cartData = {};
        for (let i = 0; i < 300; i++) {
            cartData[i] = 0;
        }
        user = new User({
            name: username,
            email,
            password,
            cartData
        });
        await user.save();
        const token = jwt.sign({
            user: {
                id: user.id
            }
        }, process.env.JWT_SECRET || 'default_secret'); // Use environment variable for JWT secret
        res.json({
            success: true,
            token
        });
    } catch (err) {
        console.error("Error signing up:", err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// User login
app.post('/login', async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.json({
                success: false,
                error: "Wrong email id"
            });
        }
        // Check password using bcrypt or other secure method
        if (user.password !== password) {
            return res.json({
                success: false,
                error: "Wrong password"
            });
        }
        const token = jwt.sign({
            user: {
                id: user.id
            }
        }, process.env.JWT_SECRET || 'default_secret'); // Use environment variable for JWT secret
        res.json({
            success: true,
            token
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: "Internal Server Error"
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
