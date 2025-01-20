const app = express();

app.use(express.json());
app.post("/api", httpHandler(ApiService));

app.listen(process.env.PORT || 3000);
