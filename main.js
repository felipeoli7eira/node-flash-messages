/** requires */
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const app = express()
const cookieParser = require('cookie-parser')

/** configs */
app.use(express.json())
app.use(
    express.urlencoded({extended: false})
)
app.set('view engine', 'ejs')
app.use(
    session(
        {
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: {maxAge: 60 * 60}
        }
    )
)
app.use(flash())

const passwordForGenerationCookie = 'a-very-very-very-very-strong-password'
app.use(cookieParser(passwordForGenerationCookie))

/** routes */
app.get('/', (req, res) => {

    const errorOne = req.flash('one')
    const errorTwo = req.flash('two')
    const errorTree = req.flash('tree')

    console.log(errorOne, errorTwo, errorTree)

    res.render('index', { errors: [errorOne, errorTwo, errorTree] })
})

app.post('/post', (req, res) => {

    req.flash('one', 'Esse é o primeiro erro')
    req.flash('two', 'Esse é o segundo erro')
    req.flash('tree', 'Esse é o terceiro erro')

    res.redirect('/')
})

/** server */
app.listen(8080, (error) => { console.log('running...') })