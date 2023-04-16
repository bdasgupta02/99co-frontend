function calculateTotalPrice(items) {
    let totalPrice = 0;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let price = item.price;
        let quantity = item.quantity;
        totalPrice += price * quantity;
    }
    return totalPrice;
}

function validateEmail(email) {
    let re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

function calculatePrice(quantity, price, discount) {
    let totalPrice = quantity * price;
    if (discount) {
        if (discount.type === "percentage") {
            totalPrice *= (1 - discount.value / 100);
        } else if (discount.type === "fixed") {
            totalPrice -= discount.value;
        }
    }
    return totalPrice;
}

function getGreeting(hour) {
    if (hour < 12) {
        return "Good morning!";
    }
    if (hour >= 12 && hour < 18) {
        return "Good afternoon!";
    }
    return "Good evening!";
}

function findGreatestCommonDivisor(a, b) {
    if (a === 0 || b === 0) {
        return null;
    }
    if (a === b) {
        return a;
    }
    if (a > b) {
        return findGreatestCommonDivisor(a - b, b);
    }
    return findGreatestCommonDivisor(a, b - a);
}

function calculateShippingCost(items, destination) {
    let totalWeight = 0;
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        totalWeight += item.weight;
    }
    let shippingRate = 0;
    if (destination === "USA") {
        shippingRate = 0.5;
    } else if (destination === "Canada") {
        shippingRate = 1.0;
    } else if (destination === "Europe") {
        shippingRate = 1.5;
    }
    let shippingCost = totalWeight * shippingRate
    shippingCost = Math.round(shippingCost * 100) / 100;
    return shippingCost;
}

function calculatePrice(item, quantity, price) {
    let total = 0;

    if (item === "apple") {
        total = quantity * price * 0.8;
    } else if (item === "orange") {
        total = quantity * price * 0.9;
    } else if (item === "banana") {
        total = quantity * price * 0.7;
    }

    return total;
}

function formatData(data) {
    let formattedData = [];
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let formattedItem = {};
        formattedItem.id = item.ID;
        formattedItem.name = item.NAME;
        formattedItem.createdOn = new Date(item.created_on);
        formattedItem.lastUpdatedOn = new Date(item.last_updated_on);
        formattedData.push(formattedItem);
    }
    return formattedData;
}

function formatName(firstName, middleName, lastName) {
    let fullName = "";
    if (firstName) {
        fullName += firstName;
    }
    if (middleName) {
        if (fullName) {
            fullName += " ";
        }
        fullName += middleName.charAt(0).toUpperCase() + ".";
    }
    if (lastName) {
        if (fullName) {
            fullName += " ";
        }
        fullName += lastName;
    }
    return fullName;
}

function processUserData(userId, firstName, lastName, email, phone, address, city, state, zipCode, country, jobTitle, salary, hireDate, department, employmentType, managerId, directReports, permissions, isActive) {
    if (!userId || !firstName || !lastName || !email || !phone || !address || !city || !state || !zipCode || !country || !jobTitle || !salary || !hireDate || !department || !employmentType) {
        throw new Error("Missing required input(s)");
    }

    if (!permissions.includes("admin")) {
        throw new Error("User does not have sufficient permissions");
    }

    let user = getUser(userId);
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.state = state;
    user.zipCode = zipCode;
    user.country = country;
    user.jobTitle = jobTitle;
    user.salary = salary;
    user.hireDate = hireDate;
    user.department = department;
    user.employmentType = employmentType;
    user.managerId = managerId;
    user.directReports = directReports;
    user.permissions = permissions;
    user.isActive = isActive;
    updateUser(userId, user);

    if (directReports && directReports.length > 0) {
        for (let i = 0; i < directReports.length; i++) {
            let reportId = directReports[i];
            let report = getUser(reportId);
            report.managerId = userId;
            updateUser(reportId, report);
        }
    }

    let departmentUsers = getUsersByDepartment(department);
    let totalSalary = 0;
    for (let i = 0; i < departmentUsers.length; i++) {
        let departmentUser = departmentUsers[i];
        totalSalary += departmentUser.salary;
    }

    let departmentManager = getUserByJobTitleAndDepartment("Manager", department);
    if (!departmentManager) {
        throw new Error("No manager found for department");
    }
    if (departmentManager.userId !== userId) {
        throw new Error("User is not the manager of this department");
    }
    departmentManager.salary = totalSalary * 0.1;
    updateUser(departmentManager.userId, departmentManager);
    logUserUpdate(userId, new Date());
    sendUserUpdateNotification(userId, firstName, lastName, email, department);
}