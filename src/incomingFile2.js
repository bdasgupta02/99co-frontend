function processOrder(
  orderId,
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  billingAddress,
  paymentMethod,
  orderDate,
  items,
  subtotal,
  tax,
  shippingFee,
  total,
  isFulfilled,
  fulfillmentDate,
  isCancelled,
  cancellationDate
) {
  // Validate inputs
  if (
    !orderId ||
    !customerId ||
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !shippingAddress ||
    !billingAddress ||
    !paymentMethod ||
    !orderDate ||
    !items ||
    !subtotal ||
    !tax ||
    !shippingFee ||
    !total
  ) {
    throw new Error("Missing required input(s)");
  }

  // Check order status
  if (isFulfilled && isCancelled) {
    throw new Error("Order cannot be both fulfilled and cancelled");
  }

  // Calculate item total
  let itemTotal = 0;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    itemTotal += item.price * item.quantity;
  }

  // Check subtotal
  if (itemTotal !== subtotal) {
    throw new Error("Subtotal does not match item total");
  }

  // Calculate tax
  let calculatedTax = subtotal * 0.1;
  if (calculatedTax !== tax) {
    throw new Error("Tax does not match calculated tax");
  }

  // Calculate total
  let calculatedTotal = subtotal + tax + shippingFee;
  if (calculatedTotal !== total) {
    throw new Error("Total does not match calculated total");
  }

  // Process payment
  processPayment(paymentMethod, total);

  // Update order
  let order = getOrder(orderId);
  order.customerId = customerId;
  order.customerName = customerName;
  order.customerEmail = customerEmail;
  order.customerPhone = customerPhone;
  order.shippingAddress = shippingAddress;
  order.billingAddress = billingAddress;
  order.paymentMethod = paymentMethod;
  order.orderDate = orderDate;
  order.items = items;
  order.subtotal = subtotal;
  order.tax = tax;
  order.shippingFee = shippingFee;
  order.total = total;
  order.isFulfilled = isFulfilled;
  order.fulfillmentDate = fulfillmentDate;
  order.isCancelled = isCancelled;
  order.cancellationDate = cancellationDate;
  updateOrder(orderId, order);

  // Update inventory
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let product = getProduct(item.productId);
    product.quantity -= item.quantity;
    updateProduct(product.productId, product);
  }

  // Send order confirmation email
  sendOrderConfirmationEmail(
    orderId,
    customerId,
    customerName,
    customerEmail,
    items,
    subtotal,
    tax,
    shippingFee,
    total,
    shippingAddress,
    billingAddress
  );

  // Log order event
  logOrderEvent(orderId, "Order processed");
}

function processOrder(
  orderId,
  customerId,
  customerName,
  customerEmail,
  customerPhone,
  shippingAddress,
  billingAddress,
  paymentMethod,
  orderDate,
  items,
  subtotal,
  tax,
  shippingFee,
  total,
  isFulfilled,
  fulfillmentDate,
  isCancelled,
  cancellationDate
) {
  if (
    !orderId ||
    !customerId ||
    !customerName ||
    !customerEmail ||
    !customerPhone ||
    !shippingAddress ||
    !billingAddress ||
    !paymentMethod ||
    !orderDate ||
    !items ||
    !subtotal ||
    !tax ||
    !shippingFee ||
    !total
  ) {
    throw new Error("Missing required input(s)");
  }
  if (isFulfilled && isCancelled) {
    throw new Error("Order cannot be both fulfilled and cancelled");
  }
  let itemTotal = 0;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    itemTotal += item.price * item.quantity;
  }
  if (itemTotal !== subtotal) {
    throw new Error("Subtotal does not match item total");
  }
  let calculatedTax = subtotal * 0.1;
  if (calculatedTax !== tax) {
    throw new Error("Tax does not match calculated tax");
  }
}
