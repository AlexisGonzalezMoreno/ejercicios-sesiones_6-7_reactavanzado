const express = require("express");
const cors = require("cors");
const webpush = require("web-push");

// Middlewares
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Constantes
const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/cj9FWINYmAs:APA91bGCeaH1tCJP01YtllyttleuoiQCcL-7_71ccurpb_JsEy-s_83xg_sNvlCrmNXC0rzBuJM0M_eA5XPxRohvvkljqLrms-s1BM9yco4ATFxXA9u_QjDZNkDRztj2Fjj0kXhGzYWE',
    expirationTime: null,
    keys: {
        p256dh: 'BDbmbQbnC7k7TLXVsfwxN8hx2ZQ8hl4zhCxbErgNA17Dcn2xAU-GFiQpPdBoA3COoeFffTcSJmRBnErmGZADS2o',
        auth: 'i9oEcykHI1rkNcNC0eDNdw'
    }
}

const vapidKeys = {
    publicKey: "BNzd5c2bDI_gOcUJNRszAMhyLK56AaEa5i8FHvsGwZppswDATdumwCkSXOovxGZWPKlMeX4TeON3vZzJHvvduhY",
    privateKey: "8CPP3SOJ95DVNiNYVPo7AjMAJZlyBRJdJM_WgBnRfC0"
}

webpush.setVapidDetails(
    'mailto: alexis@mail.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

// Routes
app.get('/', async (req, res) => {
    //res.sendStatus(200).json();
    const payload = JSON.stringify({ title: "Título de notificación", message: "Mensaje de la notificación" });
    try {
        await webpush.sendNotification(pushSubscription, payload);
        await res.send("Enviado");
    } catch (e) {
        console.log(e);
    }
});

app.post('/subscription', (req, res) => {
    console.log(req.body);
    res.sendStatus(200).json();
})

app.listen(8000, () => console.log("Server listening on port 8000"));