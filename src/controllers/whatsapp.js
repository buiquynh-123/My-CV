const venom = require("venom-bot");

venom
  .create()
  .then((client) => {
    // Đăng nhập tài khoản WhatsApp
    client.onStateChange((state) => {
      console.log("state changed", state);
      if (state === "CONFLICT") client.useHere();
    });

    // Gửi tin nhắn
    client
      .sendText(to, message)
      .then((result) => {
        console.log("Result: ", result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
      });
  })
  .catch((erro) => {
    console.log(erro);
  });
