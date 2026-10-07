import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;

public class QuizServer {

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(
                new InetSocketAddress(8080),
                0
        );

        server.createContext(
                "/api/status",
                QuizServer::status
        );

        server.start();

        System.out.println("QuizMaster Java Server Started!");
        System.out.println("Server running on port 8080");
    }

    private static void status(HttpExchange exchange)
            throws IOException {

        String response =
                "{ \"status\":\"online\", " +
                "\"project\":\"QuizMaster\", " +
                "\"technology\":\"Java\" }";

        byte[] responseBytes =
                response.getBytes(StandardCharsets.UTF_8);

        exchange.getResponseHeaders().set(
                "Content-Type",
                "application/json; charset=UTF-8"
        );

        exchange.sendResponseHeaders(
                200,
                responseBytes.length
        );

        try (OutputStream output =
                     exchange.getResponseBody()) {

            output.write(responseBytes);
        }
    }
}