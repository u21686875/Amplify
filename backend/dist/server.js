"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();
var session = require('express-session');
var MongoStore = require('connect-mongo');
var bcrypt = require('bcryptjs');
var cookie = require('cookie-parser');
var app = express();
var PORT = process.env.PORT || 3000;

// Connect to MongoDB
var mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error('Could not connect to MongoDB', err);
});

// User model
var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  friendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  profileImage: {
    type: String,
    "default": '/assets/images/user/user.jpg'
  },
  isAdmin: {
    type: Boolean,
    "default": false
  }
});
var genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Add password hashing middleware
userSchema.pre('save', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(next) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!this.isModified('password')) {
            _context.next = 4;
            break;
          }
          _context.next = 3;
          return bcrypt.hash(this.password, 10);
        case 3:
          this.password = _context.sent;
        case 4:
          next();
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
var newReleaseSchema = new mongoose.Schema({
  title: String,
  artist: String,
  image: String,
  hashtags: [String],
  comments: [{
    userName: String,
    userImage: String,
    text: String,
    likes: Number,
    dislikes: Number
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var personalPlaylistSchema = new mongoose.Schema({
  title: String,
  image: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  songs: [{
    title: String,
    artist: String
  }],
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model('User', userSchema);
var NewRelease = mongoose.model('NewRelease', newReleaseSchema);
var PersonalPlaylist = mongoose.model('PersonalPlaylist', personalPlaylistSchema, 'personalplaylist');

// Middleware
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(express["static"](path.join(__dirname, '..', '..', 'frontend', 'public')));
app.use(cors({
  origin: 'http://localhost:3000',
  // Replace with your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
// Add these configurations after your existing mongoose connection
app.use(cookie());
// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Authentication middleware
var requireAuth = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (req.session.userId) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'Authentication required'
          }));
        case 2:
          _context2.prev = 2;
          _context2.next = 5;
          return User.findById(req.session.userId);
        case 5:
          user = _context2.sent;
          if (user) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(401).json({
            message: 'User not found'
          }));
        case 8:
          req.user = user;
          next();
          _context2.next = 15;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          res.status(500).json({
            message: 'Server error'
          });
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[2, 12]]);
  }));
  return function requireAuth(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// Modified registration endpoint
app.post('/api/users/register', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body, username, password, existingUser, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context3.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          existingUser = _context3.sent;
          if (!existingUser) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Username already exists'
          }));
        case 7:
          user = new User({
            username: username,
            password: password
          });
          _context3.next = 10;
          return user.save();
        case 10:
          // Automatically log in after registration
          req.session.userId = user._id;
          res.status(201).json({
            message: 'User created successfully',
            user: {
              username: user.username,
              profileImage: user.profileImage
            }
          });
          _context3.next = 17;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](0);
          res.status(400).json({
            message: 'Error creating user',
            error: _context3.t0.message
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 14]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// User routes
app.post('/api/users', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _req$body2, username, password, existingUser, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context4.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          existingUser = _context4.sent;
          if (!existingUser) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Username already exists'
          }));
        case 7:
          user = new User({
            username: username,
            password: password
          });
          _context4.next = 10;
          return user.save();
        case 10:
          res.status(201).json({
            message: 'User created successfully'
          });
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          res.status(400).json({
            message: 'Error creating user',
            error: _context4.t0.message
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Logout endpoint
app.post('/api/users/logout', function (req, res) {
  req.session.destroy(function (err) {
    if (err) {
      return res.status(500).json({
        message: 'Error logging out'
      });
    }
    res.clearCookie('connect.sid');
    res.json({
      message: 'Logged out successfully'
    });
  });
});

// Check session endpoint
app.get('/api/users/session', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          if (req.session.userId) {
            _context5.next = 3;
            break;
          }
          return _context5.abrupt("return", res.status(401).json({
            message: 'No active session'
          }));
        case 3:
          _context5.next = 5;
          return User.findById(req.session.userId);
        case 5:
          user = _context5.sent;
          if (user) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(401).json({
            message: 'User not found'
          }));
        case 8:
          res.json({
            user: {
              username: user.username,
              profileImage: user.profileImage
            }
          });
          _context5.next = 14;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });
        case 14:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

// Modified login endpoint
app.post('/api/users/login', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, username, password, user, isValidPassword;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, username = _req$body3.username, password = _req$body3.password; // Validate that username is a string
          if (!(typeof username !== 'string' || typeof password !== 'string')) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Invalid input format'
          }));
        case 4:
          _context6.next = 6;
          return User.findOne({
            username: username.toString()
          });
        case 6:
          user = _context6.sent;
          if (user) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));
        case 9:
          _context6.next = 11;
          return bcrypt.compare(password, user.password);
        case 11:
          isValidPassword = _context6.sent;
          if (isValidPassword) {
            _context6.next = 14;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));
        case 14:
          // Set session
          req.session.userId = user._id;

          // Save session before sending response
          req.session.save(function (err) {
            if (err) {
              console.error('Session save error:', err);
              return res.status(500).json({
                message: 'Error saving session'
              });
            }
            res.json({
              message: 'Login successful',
              user: {
                username: user.username,
                profileImage: user.profileImage
              }
            });
          });
          _context6.next = 22;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](0);
          console.error('Login error:', _context6.t0);
          res.status(500).json({
            message: 'Error during login',
            error: _context6.t0.message
          });
        case 22:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 18]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

// Combined user profile update endpoint
app.put('/api/users', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var username, user, existingUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          if (req.session.userId) {
            _context7.next = 3;
            break;
          }
          return _context7.abrupt("return", res.status(401).json({
            message: 'Authentication required'
          }));
        case 3:
          username = req.body.username; // Find the current user using the session ID
          _context7.next = 6;
          return User.findById(req.session.userId);
        case 6:
          user = _context7.sent;
          if (user) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 9:
          if (!(!username || username.trim() === '')) {
            _context7.next = 11;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Username cannot be empty'
          }));
        case 11:
          _context7.next = 13;
          return User.findOne({
            username: username,
            _id: {
              $ne: user._id
            }
          });
        case 13:
          existingUser = _context7.sent;
          if (!existingUser) {
            _context7.next = 16;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Username already taken'
          }));
        case 16:
          // Update username
          user.username = username;
          _context7.next = 19;
          return user.save();
        case 19:
          // Send updated user data
          res.json({
            message: 'User updated successfully',
            username: user.username,
            profileImage: user.profileImage
          });
          _context7.next = 26;
          break;
        case 22:
          _context7.prev = 22;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating user profile:', _context7.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context7.t0.message
          });
        case 26:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 22]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app["delete"]('/api/users', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var username, deletedUser;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          username = req.body.username;
          if (username) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Username is required'
          }));
        case 4:
          _context8.next = 6;
          return User.findOneAndDelete({
            username: username
          });
        case 6:
          deletedUser = _context8.sent;
          if (deletedUser) {
            _context8.next = 9;
            break;
          }
          return _context8.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 9:
          res.json({
            message: 'User deleted successfully'
          });
          _context8.next = 16;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](0);
          console.error('Error deleting user:', _context8.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context8.t0.message
          });
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 12]]);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
app.get('/api/users/:username', requireAuth, /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return User.findOne({
            username: req.params.username
          });
        case 3:
          user = _context9.sent;
          if (user) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          res.json({
            username: user.username,
            profileImage: user.profileImage
          });
          _context9.next = 13;
          break;
        case 9:
          _context9.prev = 9;
          _context9.t0 = _context9["catch"](0);
          console.error('Error fetching user profile:', _context9.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context9.t0.message
          });
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 9]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());

// New Releases routes
app.get('/api/newReleases', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var newReleases;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return NewRelease.find().sort({
            createdAt: -1
          });
        case 3:
          newReleases = _context10.sent;
          res.json(newReleases);
          _context10.next = 10;
          break;
        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          res.status(500).json({
            message: _context10.t0.message
          });
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[0, 7]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app.post('/api/newReleases', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var newRelease, savedRelease;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          newRelease = new NewRelease(req.body);
          _context11.prev = 1;
          _context11.next = 4;
          return newRelease.save();
        case 4:
          savedRelease = _context11.sent;
          res.status(201).json(savedRelease);
          _context11.next = 11;
          break;
        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](1);
          res.status(400).json({
            message: _context11.t0.message
          });
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[1, 8]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app["delete"]('/api/newReleases/:id', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var releaseId, deletedRelease;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          releaseId = req.params.id;
          _context12.next = 4;
          return NewRelease.findByIdAndDelete(releaseId);
        case 4:
          deletedRelease = _context12.sent;
          if (deletedRelease) {
            _context12.next = 7;
            break;
          }
          return _context12.abrupt("return", res.status(404).json({
            message: 'Release not found'
          }));
        case 7:
          res.json({
            message: 'Release deleted successfully',
            deletedRelease: deletedRelease
          });
          _context12.next = 14;
          break;
        case 10:
          _context12.prev = 10;
          _context12.t0 = _context12["catch"](0);
          console.error('Error deleting release:', _context12.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context12.t0.message
          });
        case 14:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 10]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.post('/api/newReleases/:id/comments', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var releaseId, release, newComment, updatedRelease;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          releaseId = req.params.id;
          if (mongoose.Types.ObjectId.isValid(releaseId)) {
            _context13.next = 3;
            break;
          }
          return _context13.abrupt("return", res.status(400).json({
            message: 'Invalid release ID format'
          }));
        case 3:
          _context13.prev = 3;
          _context13.next = 6;
          return NewRelease.findById(releaseId);
        case 6:
          release = _context13.sent;
          if (release) {
            _context13.next = 9;
            break;
          }
          return _context13.abrupt("return", res.status(404).json({
            message: 'Release not found'
          }));
        case 9:
          newComment = {
            text: req.body.text,
            userName: req.body.userName || 'Anonymous',
            likes: 0,
            dislikes: 0
          };
          release.comments.push(newComment);
          _context13.next = 13;
          return release.save();
        case 13:
          updatedRelease = _context13.sent;
          res.json(updatedRelease);
          _context13.next = 21;
          break;
        case 17:
          _context13.prev = 17;
          _context13.t0 = _context13["catch"](3);
          console.error('Error adding comment:', _context13.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context13.t0.message
          });
        case 21:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[3, 17]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());

// Personal Playlist routes
app.get('/api/personalPlaylists', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          console.log('Fetching personal playlists...');
          _context14.next = 4;
          return PersonalPlaylist.find();
        case 4:
          playlists = _context14.sent;
          res.json(playlists);
          _context14.next = 12;
          break;
        case 8:
          _context14.prev = 8;
          _context14.t0 = _context14["catch"](0);
          console.error('Error fetching playlists:', _context14.t0);
          res.status(500).json({
            message: _context14.t0.message
          });
        case 12:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 8]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app.post('/api/personalPlaylists', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$body4, title, image, songs, username, user, playlist, savedPlaylist;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$body4 = req.body, title = _req$body4.title, image = _req$body4.image, songs = _req$body4.songs, username = _req$body4.username;
          _context15.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context15.sent;
          if (user) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          playlist = new PersonalPlaylist({
            title: title,
            image: image,
            songs: songs,
            creator: user._id
          });
          _context15.next = 10;
          return playlist.save();
        case 10:
          savedPlaylist = _context15.sent;
          res.status(201).json(savedPlaylist);
          _context15.next = 17;
          break;
        case 14:
          _context15.prev = 14;
          _context15.t0 = _context15["catch"](0);
          res.status(400).json({
            message: _context15.t0.message
          });
        case 17:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 14]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
app.post('/api/personalPlaylists/:id/songs', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var playlist, updatedPlaylist;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return PersonalPlaylist.findById(req.params.id);
        case 3:
          playlist = _context16.sent;
          playlist.songs.push(req.body);
          _context16.next = 7;
          return playlist.save();
        case 7:
          updatedPlaylist = _context16.sent;
          res.json(updatedPlaylist);
          _context16.next = 14;
          break;
        case 11:
          _context16.prev = 11;
          _context16.t0 = _context16["catch"](0);
          res.status(400).json({
            message: _context16.t0.message
          });
        case 14:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 11]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
app["delete"]('/api/personalPlaylists/:playlistId/songs/:songId', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$params, playlistId, songId, playlist, updatedPlaylist;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _req$params = req.params, playlistId = _req$params.playlistId, songId = _req$params.songId;
          _context17.next = 4;
          return PersonalPlaylist.findById(playlistId);
        case 4:
          playlist = _context17.sent;
          if (playlist) {
            _context17.next = 7;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 7:
          playlist.songs = playlist.songs.filter(function (song) {
            return song._id.toString() !== songId;
          });
          _context17.next = 10;
          return playlist.save();
        case 10:
          updatedPlaylist = _context17.sent;
          res.json(updatedPlaylist);
          _context17.next = 18;
          break;
        case 14:
          _context17.prev = 14;
          _context17.t0 = _context17["catch"](0);
          console.error('Error removing song from playlist:', _context17.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context17.t0.message
          });
        case 18:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 14]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
app["delete"]('/api/personalPlaylists/:id', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var playlistId, deletedPlaylist;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          playlistId = req.params.id;
          _context18.next = 4;
          return PersonalPlaylist.findByIdAndDelete(playlistId);
        case 4:
          deletedPlaylist = _context18.sent;
          if (deletedPlaylist) {
            _context18.next = 7;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 7:
          res.json({
            message: 'Playlist deleted successfully',
            deletedPlaylist: deletedPlaylist
          });
          _context18.next = 14;
          break;
        case 10:
          _context18.prev = 10;
          _context18.t0 = _context18["catch"](0);
          console.error('Error deleting playlist:', _context18.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context18.t0.message
          });
        case 14:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 10]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());

// Friend management routes
app.post('/api/users/friend-request', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _req$body5, fromUsername, toUsername, fromUser, toUser;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _req$body5 = req.body, fromUsername = _req$body5.fromUsername, toUsername = _req$body5.toUsername;
          _context19.next = 4;
          return User.findOne({
            username: fromUsername
          });
        case 4:
          fromUser = _context19.sent;
          _context19.next = 7;
          return User.findOne({
            username: toUsername
          });
        case 7:
          toUser = _context19.sent;
          if (!(!fromUser || !toUser)) {
            _context19.next = 10;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          if (!toUser.friendRequests.includes(fromUser._id)) {
            _context19.next = 12;
            break;
          }
          return _context19.abrupt("return", res.status(400).json({
            message: 'Friend request already sent'
          }));
        case 12:
          toUser.friendRequests.push(fromUser._id);
          _context19.next = 15;
          return toUser.save();
        case 15:
          res.json({
            message: 'Friend request sent successfully'
          });
          _context19.next = 22;
          break;
        case 18:
          _context19.prev = 18;
          _context19.t0 = _context19["catch"](0);
          console.error('Error sending friend request:', _context19.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context19.t0.message
          });
        case 22:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 18]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app.post('/api/users/accept-friend', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var _req$body6, username, friendUsername, user, friend;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _req$body6 = req.body, username = _req$body6.username, friendUsername = _req$body6.friendUsername;
          _context20.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context20.sent;
          _context20.next = 7;
          return User.findOne({
            username: friendUsername
          });
        case 7:
          friend = _context20.sent;
          if (!(!user || !friend)) {
            _context20.next = 10;
            break;
          }
          return _context20.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          if (user.friendRequests.includes(friend._id)) {
            _context20.next = 12;
            break;
          }
          return _context20.abrupt("return", res.status(400).json({
            message: 'No friend request from this user'
          }));
        case 12:
          user.friendRequests = user.friendRequests.filter(function (id) {
            return !id.equals(friend._id);
          });
          user.friends.push(friend._id);
          friend.friends.push(user._id);
          _context20.next = 17;
          return user.save();
        case 17:
          _context20.next = 19;
          return friend.save();
        case 19:
          res.json({
            message: 'Friend request accepted'
          });
          _context20.next = 26;
          break;
        case 22:
          _context20.prev = 22;
          _context20.t0 = _context20["catch"](0);
          console.error('Error accepting friend request:', _context20.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context20.t0.message
          });
        case 26:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 22]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());
app.post('/api/users/unfriend', /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var _req$body7, username, friendUsername, user, friend;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          _context21.prev = 0;
          _req$body7 = req.body, username = _req$body7.username, friendUsername = _req$body7.friendUsername;
          _context21.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context21.sent;
          _context21.next = 7;
          return User.findOne({
            username: friendUsername
          });
        case 7:
          friend = _context21.sent;
          if (!(!user || !friend)) {
            _context21.next = 10;
            break;
          }
          return _context21.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          user.friends = user.friends.filter(function (id) {
            return !id.equals(friend._id);
          });
          friend.friends = friend.friends.filter(function (id) {
            return !id.equals(user._id);
          });
          _context21.next = 14;
          return user.save();
        case 14:
          _context21.next = 16;
          return friend.save();
        case 16:
          res.json({
            message: 'Unfriended successfully'
          });
          _context21.next = 23;
          break;
        case 19:
          _context21.prev = 19;
          _context21.t0 = _context21["catch"](0);
          console.error('Error unfriending user:', _context21.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context21.t0.message
          });
        case 23:
        case "end":
          return _context21.stop();
      }
    }, _callee21, null, [[0, 19]]);
  }));
  return function (_x41, _x42) {
    return _ref21.apply(this, arguments);
  };
}());
app.get('/api/users/:username/friends', /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          _context22.prev = 0;
          _context22.next = 3;
          return User.findOne({
            username: req.params.username
          }).populate('friends', 'username').populate('friendRequests', 'username');
        case 3:
          user = _context22.sent;
          if (user) {
            _context22.next = 6;
            break;
          }
          return _context22.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          res.json({
            friends: user.friends.map(function (friend) {
              return friend.username;
            }),
            friendRequests: user.friendRequests.map(function (friend) {
              return friend.username;
            })
          });
          _context22.next = 13;
          break;
        case 9:
          _context22.prev = 9;
          _context22.t0 = _context22["catch"](0);
          console.error('Error fetching friends:', _context22.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context22.t0.message
          });
        case 13:
        case "end":
          return _context22.stop();
      }
    }, _callee22, null, [[0, 9]]);
  }));
  return function (_x43, _x44) {
    return _ref22.apply(this, arguments);
  };
}());

// Profile image route
app.post('/api/users/:username/profile-image', /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res) {
    var image, username, user;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          _context23.prev = 0;
          image = req.body.image;
          username = req.params.username;
          if (image) {
            _context23.next = 5;
            break;
          }
          return _context23.abrupt("return", res.status(400).json({
            message: 'No image provided'
          }));
        case 5:
          _context23.next = 7;
          return User.findOne({
            username: username
          });
        case 7:
          user = _context23.sent;
          if (user) {
            _context23.next = 10;
            break;
          }
          return _context23.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          user.profileImage = image;
          _context23.next = 13;
          return user.save();
        case 13:
          res.json({
            message: 'Profile image updated successfully',
            imageUrl: image
          });
          _context23.next = 20;
          break;
        case 16:
          _context23.prev = 16;
          _context23.t0 = _context23["catch"](0);
          console.error('Error updating profile image:', _context23.t0);
          res.status(500).json({
            message: 'Error updating image',
            error: _context23.t0.message
          });
        case 20:
        case "end":
          return _context23.stop();
      }
    }, _callee23, null, [[0, 16]]);
  }));
  return function (_x45, _x46) {
    return _ref23.apply(this, arguments);
  };
}());

// Add new endpoint to fetch user's playlists
app.get('/api/users/:username/playlists', /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var user, playlists;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          _context24.prev = 0;
          _context24.next = 3;
          return User.findOne({
            username: req.params.username
          });
        case 3:
          user = _context24.sent;
          if (user) {
            _context24.next = 6;
            break;
          }
          return _context24.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          _context24.next = 8;
          return PersonalPlaylist.find({
            creator: user._id
          }).sort({
            createdAt: -1
          });
        case 8:
          playlists = _context24.sent;
          res.json(playlists);
          _context24.next = 16;
          break;
        case 12:
          _context24.prev = 12;
          _context24.t0 = _context24["catch"](0);
          console.error('Error fetching user playlists:', _context24.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context24.t0.message
          });
        case 16:
        case "end":
          return _context24.stop();
      }
    }, _callee24, null, [[0, 12]]);
  }));
  return function (_x47, _x48) {
    return _ref24.apply(this, arguments);
  };
}());

// Debug route (if needed during development)
app.get('/api/debug/personalPlaylists', /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          _context25.prev = 0;
          _context25.next = 3;
          return mongoose.connection.db.collection('PersonalPlaylist').find().toArray();
        case 3:
          playlists = _context25.sent;
          res.json(playlists);
          _context25.next = 10;
          break;
        case 7:
          _context25.prev = 7;
          _context25.t0 = _context25["catch"](0);
          res.status(500).json({
            message: _context25.t0.message
          });
        case 10:
        case "end":
          return _context25.stop();
      }
    }, _callee25, null, [[0, 7]]);
  }));
  return function (_x49, _x50) {
    return _ref25.apply(this, arguments);
  };
}());

// Middleware to check if user is admin
var isAdmin = /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res, next) {
    var user;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          _context26.prev = 0;
          _context26.next = 3;
          return User.findById(req.session.userId);
        case 3:
          user = _context26.sent;
          if (user !== null && user !== void 0 && user.isAdmin) {
            _context26.next = 6;
            break;
          }
          return _context26.abrupt("return", res.status(403).json({
            message: 'Admin access required'
          }));
        case 6:
          next();
          _context26.next = 12;
          break;
        case 9:
          _context26.prev = 9;
          _context26.t0 = _context26["catch"](0);
          res.status(500).json({
            message: 'Server error'
          });
        case 12:
        case "end":
          return _context26.stop();
      }
    }, _callee26, null, [[0, 9]]);
  }));
  return function isAdmin(_x51, _x52, _x53) {
    return _ref26.apply(this, arguments);
  };
}();

// Admin routes
app.get('/api/admin/users', isAdmin, /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          _context27.prev = 0;
          _context27.next = 3;
          return User.find().select('-password');
        case 3:
          users = _context27.sent;
          res.json(users);
          _context27.next = 10;
          break;
        case 7:
          _context27.prev = 7;
          _context27.t0 = _context27["catch"](0);
          res.status(500).json({
            message: 'Error fetching users'
          });
        case 10:
        case "end":
          return _context27.stop();
      }
    }, _callee27, null, [[0, 7]]);
  }));
  return function (_x54, _x55) {
    return _ref27.apply(this, arguments);
  };
}());
app.get('/api/admin/playlists', isAdmin, /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          _context28.prev = 0;
          _context28.next = 3;
          return PersonalPlaylist.find().populate('creator', 'username');
        case 3:
          playlists = _context28.sent;
          res.json(playlists);
          _context28.next = 10;
          break;
        case 7:
          _context28.prev = 7;
          _context28.t0 = _context28["catch"](0);
          res.status(500).json({
            message: 'Error fetching playlists'
          });
        case 10:
        case "end":
          return _context28.stop();
      }
    }, _callee28, null, [[0, 7]]);
  }));
  return function (_x56, _x57) {
    return _ref28.apply(this, arguments);
  };
}());
app.get('/api/admin/songs', isAdmin, /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var songs;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          _context29.prev = 0;
          _context29.next = 3;
          return Song.find();
        case 3:
          songs = _context29.sent;
          res.json(songs);
          _context29.next = 10;
          break;
        case 7:
          _context29.prev = 7;
          _context29.t0 = _context29["catch"](0);
          res.status(500).json({
            message: 'Error fetching songs'
          });
        case 10:
        case "end":
          return _context29.stop();
      }
    }, _callee29, null, [[0, 7]]);
  }));
  return function (_x58, _x59) {
    return _ref29.apply(this, arguments);
  };
}());
app.get('/api/admin/comments', isAdmin, /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    var comments;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _context30.prev = 0;
          _context30.next = 3;
          return Comment.find().populate('user', 'username');
        case 3:
          comments = _context30.sent;
          res.json(comments);
          _context30.next = 10;
          break;
        case 7:
          _context30.prev = 7;
          _context30.t0 = _context30["catch"](0);
          res.status(500).json({
            message: 'Error fetching comments'
          });
        case 10:
        case "end":
          return _context30.stop();
      }
    }, _callee30, null, [[0, 7]]);
  }));
  return function (_x60, _x61) {
    return _ref30.apply(this, arguments);
  };
}());
app.get('/api/admin/genres', isAdmin, /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee31(req, res) {
    var genres;
    return _regeneratorRuntime().wrap(function _callee31$(_context31) {
      while (1) switch (_context31.prev = _context31.next) {
        case 0:
          _context31.prev = 0;
          _context31.next = 3;
          return Genre.find();
        case 3:
          genres = _context31.sent;
          res.json(genres);
          _context31.next = 10;
          break;
        case 7:
          _context31.prev = 7;
          _context31.t0 = _context31["catch"](0);
          res.status(500).json({
            message: 'Error fetching genres'
          });
        case 10:
        case "end":
          return _context31.stop();
      }
    }, _callee31, null, [[0, 7]]);
  }));
  return function (_x62, _x63) {
    return _ref31.apply(this, arguments);
  };
}());

// Update routes
app.put('/api/admin/:type/:id', isAdmin, /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee32(req, res) {
    var _req$params2, type, id, Model, updated;
    return _regeneratorRuntime().wrap(function _callee32$(_context32) {
      while (1) switch (_context32.prev = _context32.next) {
        case 0:
          _context32.prev = 0;
          _req$params2 = req.params, type = _req$params2.type, id = _req$params2.id;
          _context32.t0 = type;
          _context32.next = _context32.t0 === 'users' ? 5 : _context32.t0 === 'playlists' ? 7 : _context32.t0 === 'songs' ? 9 : _context32.t0 === 'comments' ? 11 : _context32.t0 === 'genres' ? 13 : 15;
          break;
        case 5:
          Model = User;
          return _context32.abrupt("break", 16);
        case 7:
          Model = PersonalPlaylist;
          return _context32.abrupt("break", 16);
        case 9:
          Model = Song;
          return _context32.abrupt("break", 16);
        case 11:
          Model = Comment;
          return _context32.abrupt("break", 16);
        case 13:
          Model = Genre;
          return _context32.abrupt("break", 16);
        case 15:
          throw new Error('Invalid type');
        case 16:
          _context32.next = 18;
          return Model.findByIdAndUpdate(id, req.body, {
            "new": true
          });
        case 18:
          updated = _context32.sent;
          res.json(updated);
          _context32.next = 25;
          break;
        case 22:
          _context32.prev = 22;
          _context32.t1 = _context32["catch"](0);
          res.status(500).json({
            message: 'Error updating item'
          });
        case 25:
        case "end":
          return _context32.stop();
      }
    }, _callee32, null, [[0, 22]]);
  }));
  return function (_x64, _x65) {
    return _ref32.apply(this, arguments);
  };
}());

// Delete routes
app["delete"]('/api/admin/:type/:id', isAdmin, /*#__PURE__*/function () {
  var _ref33 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee33(req, res) {
    var _req$params3, type, id, Model;
    return _regeneratorRuntime().wrap(function _callee33$(_context33) {
      while (1) switch (_context33.prev = _context33.next) {
        case 0:
          _context33.prev = 0;
          _req$params3 = req.params, type = _req$params3.type, id = _req$params3.id;
          _context33.t0 = type;
          _context33.next = _context33.t0 === 'users' ? 5 : _context33.t0 === 'playlists' ? 7 : _context33.t0 === 'songs' ? 9 : _context33.t0 === 'comments' ? 11 : _context33.t0 === 'genres' ? 13 : 15;
          break;
        case 5:
          Model = User;
          return _context33.abrupt("break", 16);
        case 7:
          Model = PersonalPlaylist;
          return _context33.abrupt("break", 16);
        case 9:
          Model = Song;
          return _context33.abrupt("break", 16);
        case 11:
          Model = Comment;
          return _context33.abrupt("break", 16);
        case 13:
          Model = Genre;
          return _context33.abrupt("break", 16);
        case 15:
          throw new Error('Invalid type');
        case 16:
          _context33.next = 18;
          return Model.findByIdAndDelete(id);
        case 18:
          res.json({
            message: 'Item deleted successfully'
          });
          _context33.next = 24;
          break;
        case 21:
          _context33.prev = 21;
          _context33.t1 = _context33["catch"](0);
          res.status(500).json({
            message: 'Error deleting item'
          });
        case 24:
        case "end":
          return _context33.stop();
      }
    }, _callee33, null, [[0, 21]]);
  }));
  return function (_x66, _x67) {
    return _ref33.apply(this, arguments);
  };
}());

// Add genre
app.post('/api/admin/genres', isAdmin, /*#__PURE__*/function () {
  var _ref34 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee34(req, res) {
    var genre;
    return _regeneratorRuntime().wrap(function _callee34$(_context34) {
      while (1) switch (_context34.prev = _context34.next) {
        case 0:
          _context34.prev = 0;
          genre = new Genre(req.body);
          _context34.next = 4;
          return genre.save();
        case 4:
          res.status(201).json(genre);
          _context34.next = 10;
          break;
        case 7:
          _context34.prev = 7;
          _context34.t0 = _context34["catch"](0);
          res.status(500).json({
            message: 'Error creating genre'
          });
        case 10:
        case "end":
          return _context34.stop();
      }
    }, _callee34, null, [[0, 7]]);
  }));
  return function (_x68, _x69) {
    return _ref34.apply(this, arguments);
  };
}());
var initializeAdmin = /*#__PURE__*/function () {
  var _ref35 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee35(req, res) {
    var existingAdmin, adminUser;
    return _regeneratorRuntime().wrap(function _callee35$(_context35) {
      while (1) switch (_context35.prev = _context35.next) {
        case 0:
          if (!(process.env.NODE_ENV === 'production')) {
            _context35.next = 2;
            break;
          }
          return _context35.abrupt("return", res.status(403).json({
            message: 'Not available in production'
          }));
        case 2:
          _context35.prev = 2;
          _context35.next = 5;
          return User.findOne({
            username: process.env.ADMIN_USERNAME
          });
        case 5:
          existingAdmin = _context35.sent;
          if (!existingAdmin) {
            _context35.next = 8;
            break;
          }
          return _context35.abrupt("return", res.status(400).json({
            message: 'Admin already exists'
          }));
        case 8:
          // Create admin user
          adminUser = new User({
            username: 'admin',
            password: 'admin123',
            isAdmin: true
          });
          _context35.next = 11;
          return adminUser.save();
        case 11:
          res.status(201).json({
            message: 'Admin user created successfully'
          });
          _context35.next = 18;
          break;
        case 14:
          _context35.prev = 14;
          _context35.t0 = _context35["catch"](2);
          console.error('Error creating admin:', _context35.t0);
          res.status(500).json({
            message: 'Error creating admin user'
          });
        case 18:
        case "end":
          return _context35.stop();
      }
    }, _callee35, null, [[2, 14]]);
  }));
  return function initializeAdmin(_x70, _x71) {
    return _ref35.apply(this, arguments);
  };
}();
app.post('/api/init-admin', initializeAdmin);

// Modified song route to fetch from NewRelease collection
app.get('/api/admin/newReleases', isAdmin, /*#__PURE__*/function () {
  var _ref36 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee36(req, res) {
    var songs;
    return _regeneratorRuntime().wrap(function _callee36$(_context36) {
      while (1) switch (_context36.prev = _context36.next) {
        case 0:
          _context36.prev = 0;
          _context36.next = 3;
          return NewRelease.find().sort({
            createdAt: -1
          });
        case 3:
          songs = _context36.sent;
          res.json(songs);
          _context36.next = 10;
          break;
        case 7:
          _context36.prev = 7;
          _context36.t0 = _context36["catch"](0);
          res.status(500).json({
            message: 'Error fetching songs'
          });
        case 10:
        case "end":
          return _context36.stop();
      }
    }, _callee36, null, [[0, 7]]);
  }));
  return function (_x72, _x73) {
    return _ref36.apply(this, arguments);
  };
}());

// New route to fetch all comments across all releases
app.get('/api/admin/comments', isAdmin, /*#__PURE__*/function () {
  var _ref37 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee37(req, res) {
    var releases, allComments;
    return _regeneratorRuntime().wrap(function _callee37$(_context37) {
      while (1) switch (_context37.prev = _context37.next) {
        case 0:
          _context37.prev = 0;
          _context37.next = 3;
          return NewRelease.find();
        case 3:
          releases = _context37.sent;
          allComments = releases.reduce(function (acc, release) {
            var commentsWithMetadata = release.comments.map(function (comment) {
              return _objectSpread(_objectSpread({}, comment.toObject()), {}, {
                _id: comment._id,
                songTitle: release.title,
                songArtist: release.artist,
                releaseId: release._id
              });
            });
            return [].concat(_toConsumableArray(acc), _toConsumableArray(commentsWithMetadata));
          }, []);
          res.json(allComments);
          _context37.next = 11;
          break;
        case 8:
          _context37.prev = 8;
          _context37.t0 = _context37["catch"](0);
          res.status(500).json({
            message: 'Error fetching comments'
          });
        case 11:
        case "end":
          return _context37.stop();
      }
    }, _callee37, null, [[0, 8]]);
  }));
  return function (_x74, _x75) {
    return _ref37.apply(this, arguments);
  };
}());

// Update delete routes to handle the nested structure
app["delete"]('/api/admin/comments/:releaseId/:commentId', isAdmin, /*#__PURE__*/function () {
  var _ref38 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee38(req, res) {
    var _req$params4, releaseId, commentId, release;
    return _regeneratorRuntime().wrap(function _callee38$(_context38) {
      while (1) switch (_context38.prev = _context38.next) {
        case 0:
          _context38.prev = 0;
          _req$params4 = req.params, releaseId = _req$params4.releaseId, commentId = _req$params4.commentId;
          _context38.next = 4;
          return NewRelease.findById(releaseId);
        case 4:
          release = _context38.sent;
          if (release) {
            _context38.next = 7;
            break;
          }
          return _context38.abrupt("return", res.status(404).json({
            message: 'Release not found'
          }));
        case 7:
          release.comments = release.comments.filter(function (comment) {
            return comment._id.toString() !== commentId;
          });
          _context38.next = 10;
          return release.save();
        case 10:
          res.json({
            message: 'Comment deleted successfully'
          });
          _context38.next = 16;
          break;
        case 13:
          _context38.prev = 13;
          _context38.t0 = _context38["catch"](0);
          res.status(500).json({
            message: 'Error deleting comment'
          });
        case 16:
        case "end":
          return _context38.stop();
      }
    }, _callee38, null, [[0, 13]]);
  }));
  return function (_x76, _x77) {
    return _ref38.apply(this, arguments);
  };
}());

// Update comment
app.put('/api/admin/comments/:releaseId/:commentId', isAdmin, /*#__PURE__*/function () {
  var _ref39 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee39(req, res) {
    var _req$params5, releaseId, commentId, release, commentIndex;
    return _regeneratorRuntime().wrap(function _callee39$(_context39) {
      while (1) switch (_context39.prev = _context39.next) {
        case 0:
          _context39.prev = 0;
          _req$params5 = req.params, releaseId = _req$params5.releaseId, commentId = _req$params5.commentId;
          _context39.next = 4;
          return NewRelease.findById(releaseId);
        case 4:
          release = _context39.sent;
          if (release) {
            _context39.next = 7;
            break;
          }
          return _context39.abrupt("return", res.status(404).json({
            message: 'Release not found'
          }));
        case 7:
          commentIndex = release.comments.findIndex(function (comment) {
            return comment._id.toString() === commentId;
          });
          if (!(commentIndex === -1)) {
            _context39.next = 10;
            break;
          }
          return _context39.abrupt("return", res.status(404).json({
            message: 'Comment not found'
          }));
        case 10:
          release.comments[commentIndex] = _objectSpread(_objectSpread(_objectSpread({}, release.comments[commentIndex].toObject()), req.body), {}, {
            _id: commentId
          });
          _context39.next = 13;
          return release.save();
        case 13:
          res.json(release.comments[commentIndex]);
          _context39.next = 19;
          break;
        case 16:
          _context39.prev = 16;
          _context39.t0 = _context39["catch"](0);
          res.status(500).json({
            message: 'Error updating comment'
          });
        case 19:
        case "end":
          return _context39.stop();
      }
    }, _callee39, null, [[0, 16]]);
  }));
  return function (_x78, _x79) {
    return _ref39.apply(this, arguments);
  };
}());

// Serve static files and handle all routes
app.use(express["static"](path.join(__dirname, '../../frontend/public')));

// Catch-all route to serve the main HTML file
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});

// Start the server
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});