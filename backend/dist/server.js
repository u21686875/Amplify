"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;

// Connect to MongoDB
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amplify_music_db';
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
  }]
});
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
  }]
});
var personalPlaylistSchema = new mongoose.Schema({
  title: String,
  image: String,
  songs: [{
    title: String,
    artist: String
  }]
});
var User = mongoose.model('User', userSchema);
var NewRelease = mongoose.model('NewRelease', newReleaseSchema);
var PersonalPlaylist = mongoose.model('PersonalPlaylist', personalPlaylistSchema, 'personalplaylist');
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

// Serve static files from the 'public' directory in the frontend folder
app.use(express["static"](path.join(__dirname, '..', '..', 'frontend', 'public')));

// User routes
app.post('/api/users', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, username, password, existingUser, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          _context.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          existingUser = _context.sent;
          if (!existingUser) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Username already exists'
          }));
        case 7:
          user = new User({
            username: username,
            password: password
          });
          _context.next = 10;
          return user.save();
        case 10:
          res.status(201).json({
            message: 'User created successfully'
          });
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            message: 'Error creating user',
            error: _context.t0.message
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/api/users/login', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body2, username, password, user;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
          _context2.next = 4;
          return User.findOne({
            username: username,
            password: password
          });
        case 4:
          user = _context2.sent;
          if (user) {
            res.json({
              message: 'Login successful'
            });
          } else {
            res.status(401).json({
              message: 'Invalid credentials'
            });
          }
          _context2.next = 11;
          break;
        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: 'Error during login',
            error: _context2.t0.message
          });
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.get('/api/users', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return User.findOne();
        case 3:
          user = _context3.sent;
          if (user) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          res.json({
            username: user.username
          });
          _context3.next = 13;
          break;
        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          console.error('Error fetching user profile:', _context3.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context3.t0.message
          });
        case 13:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 9]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.put('/api/users', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var user, username;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return User.findOne();
        case 3:
          user = _context4.sent;
          if (user) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          username = req.body.username;
          user.username = username;
          _context4.next = 10;
          return user.save();
        case 10:
          res.json({
            username: user.username
          });
          _context4.next = 17;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating user profile:', _context4.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context4.t0.message
          });
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// Songs and Playlist
app.get('/api/newReleases', /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var newReleases;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return NewRelease.find();
        case 3:
          newReleases = _context5.sent;
          res.json(newReleases);
          _context5.next = 10;
          break;
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });
        case 10:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
app.post('/api/newReleases', /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var newRelease, savedRelease;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          newRelease = new NewRelease(req.body);
          _context6.prev = 1;
          _context6.next = 4;
          return newRelease.save();
        case 4:
          savedRelease = _context6.sent;
          res.status(201).json(savedRelease);
          _context6.next = 11;
          break;
        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](1);
          res.status(400).json({
            message: _context6.t0.message
          });
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
app.put('/api/users', /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var user, username, existingUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return User.findOne();
        case 3:
          user = _context7.sent;
          if (user) {
            _context7.next = 6;
            break;
          }
          return _context7.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          username = req.body.username; // Add some basic validation
          if (!(!username || username.trim() === '')) {
            _context7.next = 9;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Username cannot be empty'
          }));
        case 9:
          _context7.next = 11;
          return User.findOne({
            username: username,
            _id: {
              $ne: user._id
            }
          });
        case 11:
          existingUser = _context7.sent;
          if (!existingUser) {
            _context7.next = 14;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Username already taken'
          }));
        case 14:
          user.username = username;
          _context7.next = 17;
          return user.save();
        case 17:
          res.json({
            message: 'User updated successfully',
            username: user.username
          });
          _context7.next = 24;
          break;
        case 20:
          _context7.prev = 20;
          _context7.t0 = _context7["catch"](0);
          console.error('Error updating user profile:', _context7.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context7.t0.message
          });
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 20]]);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
app["delete"]('/api/users', /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var username, deletedUser;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          // In a real application, you would get the user ID from the authenticated session
          // For this example, we'll use the username from the request body
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
app["delete"]('/api/newReleases/:id', /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var releaseId, deletedRelease;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          releaseId = req.params.id;
          _context9.next = 4;
          return NewRelease.findByIdAndDelete(releaseId);
        case 4:
          deletedRelease = _context9.sent;
          if (deletedRelease) {
            _context9.next = 7;
            break;
          }
          return _context9.abrupt("return", res.status(404).json({
            message: 'Release not found'
          }));
        case 7:
          res.json({
            message: 'Release deleted successfully',
            deletedRelease: deletedRelease
          });
          _context9.next = 14;
          break;
        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](0);
          console.error('Error deleting release:', _context9.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context9.t0.message
          });
        case 14:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 10]]);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
app.post('/api/newReleases/:id/comments', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var releaseId, release, newComment, updatedRelease;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          releaseId = req.params.id;
          if (mongoose.Types.ObjectId.isValid(releaseId)) {
            _context10.next = 3;
            break;
          }
          return _context10.abrupt("return", res.status(400).json({
            message: 'Invalid release ID format'
          }));
        case 3:
          _context10.prev = 3;
          _context10.next = 6;
          return NewRelease.findById(releaseId);
        case 6:
          release = _context10.sent;
          if (release) {
            _context10.next = 9;
            break;
          }
          return _context10.abrupt("return", res.status(404).json({
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
          _context10.next = 13;
          return release.save();
        case 13:
          updatedRelease = _context10.sent;
          res.json(updatedRelease);
          _context10.next = 21;
          break;
        case 17:
          _context10.prev = 17;
          _context10.t0 = _context10["catch"](3);
          console.error('Error adding comment:', _context10.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context10.t0.message
          });
        case 21:
        case "end":
          return _context10.stop();
      }
    }, _callee10, null, [[3, 17]]);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());
app.get('/api/personalPlaylists', /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          console.log('Fetching personal playlists...');
          _context11.next = 4;
          return PersonalPlaylist.find();
        case 4:
          playlists = _context11.sent;
          // console.log('Playlists fetched:', playlists);
          if (playlists.length === 0) {
            // console.log('No playlists found in the database.');
          }
          res.json(playlists);
          _context11.next = 13;
          break;
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
          console.error('Error fetching playlists:', _context11.t0);
          res.status(500).json({
            message: _context11.t0.message
          });
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
app.get('/api/debug/personalPlaylists', /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var playlists;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return mongoose.connection.db.collection('PersonalPlaylist').find().toArray();
        case 3:
          playlists = _context12.sent;
          res.json(playlists);
          _context12.next = 10;
          break;
        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          res.status(500).json({
            message: _context12.t0.message
          });
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12, null, [[0, 7]]);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());
app.post('/api/personalPlaylists', /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var playlist, savedPlaylist;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          playlist = new PersonalPlaylist(req.body);
          _context13.prev = 1;
          _context13.next = 4;
          return playlist.save();
        case 4:
          savedPlaylist = _context13.sent;
          res.status(201).json(savedPlaylist);
          _context13.next = 11;
          break;
        case 8:
          _context13.prev = 8;
          _context13.t0 = _context13["catch"](1);
          res.status(400).json({
            message: _context13.t0.message
          });
        case 11:
        case "end":
          return _context13.stop();
      }
    }, _callee13, null, [[1, 8]]);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
app.post('/api/personalPlaylists/:id/songs', /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var playlist, updatedPlaylist;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return PersonalPlaylist.findById(req.params.id);
        case 3:
          playlist = _context14.sent;
          playlist.songs.push(req.body);
          _context14.next = 7;
          return playlist.save();
        case 7:
          updatedPlaylist = _context14.sent;
          res.json(updatedPlaylist);
          _context14.next = 14;
          break;
        case 11:
          _context14.prev = 11;
          _context14.t0 = _context14["catch"](0);
          res.status(400).json({
            message: _context14.t0.message
          });
        case 14:
        case "end":
          return _context14.stop();
      }
    }, _callee14, null, [[0, 11]]);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
app["delete"]('/api/personalPlaylists/:playlistId/songs/:songId', /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var _req$params, playlistId, songId, playlist, updatedPlaylist;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _req$params = req.params, playlistId = _req$params.playlistId, songId = _req$params.songId;
          _context15.next = 4;
          return PersonalPlaylist.findById(playlistId);
        case 4:
          playlist = _context15.sent;
          if (playlist) {
            _context15.next = 7;
            break;
          }
          return _context15.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 7:
          playlist.songs = playlist.songs.filter(function (song) {
            return song._id.toString() !== songId;
          });
          _context15.next = 10;
          return playlist.save();
        case 10:
          updatedPlaylist = _context15.sent;
          res.json(updatedPlaylist);
          _context15.next = 18;
          break;
        case 14:
          _context15.prev = 14;
          _context15.t0 = _context15["catch"](0);
          console.error('Error removing song from playlist:', _context15.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context15.t0.message
          });
        case 18:
        case "end":
          return _context15.stop();
      }
    }, _callee15, null, [[0, 14]]);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
app["delete"]('/api/personalPlaylists/:id', /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var playlistId, deletedPlaylist;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          playlistId = req.params.id;
          _context16.next = 4;
          return PersonalPlaylist.findByIdAndDelete(playlistId);
        case 4:
          deletedPlaylist = _context16.sent;
          if (deletedPlaylist) {
            _context16.next = 7;
            break;
          }
          return _context16.abrupt("return", res.status(404).json({
            message: 'Playlist not found'
          }));
        case 7:
          res.json({
            message: 'Playlist deleted successfully',
            deletedPlaylist: deletedPlaylist
          });
          _context16.next = 14;
          break;
        case 10:
          _context16.prev = 10;
          _context16.t0 = _context16["catch"](0);
          console.error('Error deleting playlist:', _context16.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context16.t0.message
          });
        case 14:
        case "end":
          return _context16.stop();
      }
    }, _callee16, null, [[0, 10]]);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());

// Send a friend request
app.post('/api/users/friend-request', /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$body3, fromUsername, toUsername, fromUser, toUser;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _req$body3 = req.body, fromUsername = _req$body3.fromUsername, toUsername = _req$body3.toUsername;
          _context17.next = 4;
          return User.findOne({
            username: fromUsername
          });
        case 4:
          fromUser = _context17.sent;
          _context17.next = 7;
          return User.findOne({
            username: toUsername
          });
        case 7:
          toUser = _context17.sent;
          if (!(!fromUser || !toUser)) {
            _context17.next = 10;
            break;
          }
          return _context17.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          if (!toUser.friendRequests.includes(fromUser._id)) {
            _context17.next = 12;
            break;
          }
          return _context17.abrupt("return", res.status(400).json({
            message: 'Friend request already sent'
          }));
        case 12:
          toUser.friendRequests.push(fromUser._id);
          _context17.next = 15;
          return toUser.save();
        case 15:
          res.json({
            message: 'Friend request sent successfully'
          });
          _context17.next = 22;
          break;
        case 18:
          _context17.prev = 18;
          _context17.t0 = _context17["catch"](0);
          console.error('Error sending friend request:', _context17.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context17.t0.message
          });
        case 22:
        case "end":
          return _context17.stop();
      }
    }, _callee17, null, [[0, 18]]);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());

// Accept a friend request
app.post('/api/users/accept-friend', /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var _req$body4, username, friendUsername, user, friend;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _req$body4 = req.body, username = _req$body4.username, friendUsername = _req$body4.friendUsername;
          _context18.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context18.sent;
          _context18.next = 7;
          return User.findOne({
            username: friendUsername
          });
        case 7:
          friend = _context18.sent;
          if (!(!user || !friend)) {
            _context18.next = 10;
            break;
          }
          return _context18.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          if (user.friendRequests.includes(friend._id)) {
            _context18.next = 12;
            break;
          }
          return _context18.abrupt("return", res.status(400).json({
            message: 'No friend request from this user'
          }));
        case 12:
          user.friendRequests = user.friendRequests.filter(function (id) {
            return !id.equals(friend._id);
          });
          user.friends.push(friend._id);
          friend.friends.push(user._id);
          _context18.next = 17;
          return user.save();
        case 17:
          _context18.next = 19;
          return friend.save();
        case 19:
          res.json({
            message: 'Friend request accepted'
          });
          _context18.next = 26;
          break;
        case 22:
          _context18.prev = 22;
          _context18.t0 = _context18["catch"](0);
          console.error('Error accepting friend request:', _context18.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context18.t0.message
          });
        case 26:
        case "end":
          return _context18.stop();
      }
    }, _callee18, null, [[0, 22]]);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());

// Unfriend a user
app.post('/api/users/unfriend', /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var _req$body5, username, friendUsername, user, friend;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _req$body5 = req.body, username = _req$body5.username, friendUsername = _req$body5.friendUsername;
          _context19.next = 4;
          return User.findOne({
            username: username
          });
        case 4:
          user = _context19.sent;
          _context19.next = 7;
          return User.findOne({
            username: friendUsername
          });
        case 7:
          friend = _context19.sent;
          if (!(!user || !friend)) {
            _context19.next = 10;
            break;
          }
          return _context19.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 10:
          user.friends = user.friends.filter(function (id) {
            return !id.equals(friend._id);
          });
          friend.friends = friend.friends.filter(function (id) {
            return !id.equals(user._id);
          });
          _context19.next = 14;
          return user.save();
        case 14:
          _context19.next = 16;
          return friend.save();
        case 16:
          res.json({
            message: 'Unfriended successfully'
          });
          _context19.next = 23;
          break;
        case 19:
          _context19.prev = 19;
          _context19.t0 = _context19["catch"](0);
          console.error('Error unfriending user:', _context19.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context19.t0.message
          });
        case 23:
        case "end":
          return _context19.stop();
      }
    }, _callee19, null, [[0, 19]]);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());
app.get('/api/users/:username/friends', /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.prev = 0;
          _context20.next = 3;
          return User.findOne({
            username: req.params.username
          }).populate('friends', 'username').populate('friendRequests', 'username');
        case 3:
          user = _context20.sent;
          if (user) {
            _context20.next = 6;
            break;
          }
          return _context20.abrupt("return", res.status(404).json({
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
          _context20.next = 13;
          break;
        case 9:
          _context20.prev = 9;
          _context20.t0 = _context20["catch"](0);
          console.error('Error fetching friends:', _context20.t0);
          res.status(500).json({
            message: 'Internal server error',
            error: _context20.t0.message
          });
        case 13:
        case "end":
          return _context20.stop();
      }
    }, _callee20, null, [[0, 9]]);
  }));
  return function (_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}());

// Serve the main HTML file for all routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'public', 'index.html'));
});
app.listen(PORT, function () {
  console.log("Server is running on http://localhost:".concat(PORT));
});