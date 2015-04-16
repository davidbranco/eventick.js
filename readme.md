![](https://d1y8tirxzz9nde.cloudfront.net/assets/public/logo-footer-d10f5f3bf5936a4087bcc3af5b781feb.png).js
---

JavaScript wrapper around Eventick's API. Amazingly backed by Promises and Functional Programming.

Usage
---

Grab it from npm:

```bash
npm install -save eventick.js
```

The lib has only one method, called `login`. After logging in, the user will have access to the API.

1. `Eventick.login(user, password)`
  - Type: `String -> String -> Promise`
  - Usage: enter credentials, the promise will resolve to an `Object` representing the API or throw an `Error Object`. Use `.then()` and `.catch()` rather than `.then(ok, rejected)`.
  
Logged API:

1. `token`
  - Type: `String`
  - Usage: normally you're not going to use this. however, if you'd need it, here it is.
  
2. `events.get(id)`
  - Type: `Number -> Promise`
  - Usage: enter event's id, get a promise that will resolve to an `Object` containing event's data or throw an `Error Object`.

3. `events.getList()`
  - Type: `(no param) -> Promise`
  - Usage: get a promise that will resolve to an `Array` containing events' data or throw an `Error Object`.

4. `attendees.get(eventId, attendeeId)`
  - Type: `Number -> Number -> Promise`
  - Usage: enter event's id and attendee's id, get a promise that will resolve to an `Object` containing attendee's data or throw an `Error Object`.

3. `attendees.getList(eventId)`
  - Type: `Number -> Promise`
  - Usage: get a promise that will resolve to an `Array` containing events' data or throw an `Error Object`.

<!--
4. `attendees.checkin(eventId, attendees)`
  - Type: `Number -> Any* -> Promise`
  - `Any*`: You should pass or a) an `Object` containing `code` and `check_at` (optional) props or b) an `Array` containing multiples `Objects` of `code` and `check_at`.
  - Usage: enter event's id, attendees' `Array`or `Object`, get a promise that will resolve to ok or throw an `Error Object`.
-->

###FAQ

1. Yes, all methods are curried.
2. Yes, all methods return promises.
3. Do I need to know Functional Programming in order to use it? No.
4. And what about promises? Yes.

Roadmap
---

 - [ ] Add tests
 - [x] Add docs

License
---

MIT
