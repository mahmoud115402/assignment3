
const express = require("express"); 
const fs = require("fs"); 
const path = require("path"); 
 
const app = express(); 
 
const filePath = path.resolve("users.JSON"); 
  
 
 
// 1. 
app.post("/user", (req, res, next) => { 
  let body = ""; 
 
  req.on("data", (chunk) => { 
    body += chunk; 
  }); 
 
  req.on("end", () => { 
    const newUser = JSON.parse(body); 
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
 
    for (const id in users) { 
      if (users[id].email === newUser.email) { 
        return res.json({ message: "Email already exists." }); 
      } 
    } 
 
    users[newUser.id] = newUser; 
 
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 
 
    res.json({ message: "User added successfully." }); 
  }); 
}); 
 
// 2 
app.patch("/user/:id", (req, res, next) => { 
  let body = ""; 
 
  req.on("data", (chunk) => { 
    body += chunk; 
  }); 
 
  req.on("end", () => { 
    const data = JSON.parse(body); 
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
    const id = req.params.id; 
 
    if (!users[id]) { 
      return res.json({ message: "User ID not found." }); 
    } 
 
    users[id].name = data.name || users[id].name; 
    users[id].age = data.age || users[id].age; 
    users[id].email = data.email || users[id].email; 
 
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 
 
    res.json({ message: "User updated successfully." }); 
  }); 
}); 
 
// 3 
app.delete("/user/:id", (req, res, next) => { 
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
  const id = req.params.id; 
 
  if (!users[id]) { 
    return res.json({ message: "User ID not found." }); 
  } 
 
  delete users[id]; 
 
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2)); 
 
  res.json({ message: "User deleted successfully." }); 
}); 
 
// 4 
app.get("/users/:name", (req, res, next) => { 
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
  const name = req.params.name; 
 
  if (!isNaN(name)) { 
    return next(); 
  } 
 
  for (const id in users) { 
    if (users[id].name === name) { 
      return res.json(users[id]); 
    } 
  } 
 
  res.json({ message: "User not found." }); 
}); 
 
// 5 
app.get("/users", (req, res, next) => { 
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
 
  res.json(users); 
}); 
 
// 6 
app.get("/user/filter", (req, res, next) => { 
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
  const minAge = Number(req.query.minAge); 
  const result = {}; 
 
  for (const id in users) { 
    if (users[id].age >= minAge) { 
      result[id] = users[id]; 
    } 
  } 
 
  res.json(result); 
}); 
 
// 7 
app.get("/users/:id", (req, res, next) => { 
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8")); 
  const id = req.params.id; 
 
  if (!users[id]) { 
    return res.json({ message: "User not found." }); 
  } 
 
  res.json(users[id]); 
}); 
 
app.listen(3000, () => { 
 
});
