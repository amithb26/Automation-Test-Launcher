package entities;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import javax.ws.rs.core.Response;

public class Command {
	public static Response Run() 
    { 
		String test = "FAIL";
        try 
        { 
            Process p=Runtime.getRuntime().exec("cmd /c dir"); 
            p.waitFor(); 
            BufferedReader reader=new BufferedReader(
                new InputStreamReader(p.getInputStream())
            ); 
            String line; 
            while((line = reader.readLine()) != null) 
            { 
                System.out.println(line);
            }
            test = "PASS";

        }
        catch(IOException e1) { test = "FAIL"; } 
        catch(InterruptedException e2) { test = "FAIL";} 

        return Response.ok(test)
				.header("Access-Control-Allow-Origin", "*")
				.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
				.header("Access-Control-Allow-Headers", "Content-Type")
				.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
				.allow("OPTIONS")
				.build(); 
    }

}
