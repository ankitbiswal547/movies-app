if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const axios = require("axios").default;
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const flash = require("connect-flash");
const session = require("express-session");
const MongoDBStore = require('connect-mongo')(session);
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/moviesapp';
// 
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB connected!!");
    })
    .catch(e => {
        console.log(e);
    })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '/views'));

const store = new MongoDBStore({
    url: dbUrl,
    secret: "keyboard dog",
    touchAfter: 24 * 60 * 60
})

const sessionConfig = {
    store,
    secret: 'keyboard dog',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
app.use(session(sessionConfig));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.get('/', (req, res) => {
    const movies = [];
    res.render("home.ejs", { movies });
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/signup', (req, res) => {
    res.render("signup");
})


app.post('/signup', async (req, res) => {
    try {
        const { username, fullname, password, email } = req.body;
        const images = ["https://res.cloudinary.com/ankitcloudinary/image/upload/v1647787217/lights%20out/avatar2_xk8ikz.webp", "https://res.cloudinary.com/ankitcloudinary/image/upload/v1647787217/lights%20out/avatar_unmgy1.webp", "https://res.cloudinary.com/ankitcloudinary/image/upload/v1647787217/lights%20out/avatar3_stqbsw.webp", "https://res.cloudinary.com/ankitcloudinary/image/upload/v1647787217/lights%20out/avatar1_axkkg5.webp", "https://res.cloudinary.com/ankitcloudinary/image/upload/v1647787217/lights%20out/avatar4_dkrgtc.webp"]

        // console.log(username, fullname, password, email, images[0]);

        const user = new User({
            email,
            username,
            fullname,
            image: images[Math.floor(Math.random() * 5)],
            playlists: []
        })

        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash('error', "You must be signed.");
                return res.redirect('/');
            }
        })
        req.flash('success', `Congratulations ${fullname}, your account has been successfully created`);
        return res.redirect('/');
    } catch (e) {
        // console.log("Error", e);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }
})

app.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), async (req, res) => {
    req.flash('success', "Welcome Back! Nice to see you again.");
    res.redirect('/');
})

app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "You have been successfully logged out!!");
    res.redirect('/');
})

app.get('/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (query == "") {
            req.flash('error', "Search query cannot be empty!!");
            return res.redirect('/');
        }
        const data = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);

        if (data.data.Response === 'False') {

            req.flash("error", data.data.Error);
            return res.redirect('/');
        } else {
            return res.render("home", { movies: data.data.Search });
        }
    } catch (e) {
        req.flash("error", "Check your internet connectivity.");
        res.redirect('/');
    }
})


app.post('/:id/create-playlist', async (req, res) => {
    const { playlist, status, title } = req.body;
    const newPlaylist = {
        name: playlist,
        status,
        movies: [{ movieTitle: title }]
    }

    const user = await User.findById(req.params.id);
    user.playlists.push(newPlaylist);
    const savedUser = await user.save();
    req.flash('success', `${playlist} playlist has been created.`);
    res.redirect('/');
})

app.post('/:id/add-to-playlist', async (req, res) => {
    const { playlist, title } = req.body;
    let playlistName = "";
    const user = await User.findById(req.params.id);
    for (let i = 0; i < user.playlists.length; i++) {
        if (user.playlists[i]._id == playlist) {
            playlistName = user.playlists[i].name;
            console.log("Entered!!!");
            user.playlists[i].movies.push({ movieTitle: title });
        }
    }
    const savedUser = await user.save();
    req.flash('success', `Movie has been successfully added to ${playlistName} playlist.`);
    res.redirect('/');
})

// error handling route
app.use((req, res, next) => {
    req.flash('error', "The page you searched for is not found.")
    res.redirect('/');
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App started at port ${port}`);
})
