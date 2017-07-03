package entities;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.gson.*;

public class database {
	static String TBMapPath = "/home/payal/GUI/workspace/SR_Server/src/TestbedMap.json";
	 public static Response getTBMap(){
		 JsonObject jsonObject = new JsonObject();
			try {
				File file = new File(TBMapPath);
				if (!file.exists()) {
					return Response.status(Status.NOT_FOUND).build();  
				}
				else {
					 System.out.println("GET REQUEST");
					 JsonParser parser = new JsonParser();
			         JsonElement jsonElement = parser.parse(new FileReader(TBMapPath));
			         jsonObject = jsonElement.getAsJsonObject();
				}
			} catch (IOException e) { 
		         e.printStackTrace(); 
		      }
					
			return Response.status(201).entity(jsonObject.toString()).build(); 
	 }
	 
	 public static Response updateTBStatus(TBMapBody chosenTB){
		 JsonObject jsonObject = new JsonObject();
		 JsonObject jsonObject1 = new JsonObject();
		 try {
			 System.out.println("Inside update variable and chosen tb is");
			 System.out.println(chosenTB.testbed);
			 JsonParser parser = new JsonParser();
	         JsonElement jsonElement = parser.parse(new FileReader(TBMapPath));
	         jsonObject = jsonElement.getAsJsonObject();
			 System.out.println("The jsonObject content is as displayed below");
			 System.out.println("1");
		     System.out.println(jsonObject);
			 jsonObject1 = jsonObject.getAsJsonObject("Status");
			 System.out.println("The status content is as displayed below");
		     System.out.println(jsonObject1);
			 jsonObject1.addProperty(chosenTB.testbed, chosenTB.state);
			 System.out.println("2");
			 System.out.println("The status content after updating is as displayed below");
		     System.out.println(jsonObject1);
		     jsonObject.add("Status", jsonObject1);
			 System.out.println("The jsonObject content after updating is as displayed below");
		     System.out.println(jsonObject);
	        } catch (FileNotFoundException e) {
				return Response.status(Status.NOT_FOUND).build();
	        }
	     try  {
	    	 System.out.println("In Try Block2 : Update TB Status");
	    	 FileWriter JSONfile = new FileWriter(TBMapPath);
	    	 System.out.println("Writing To File");  	    	
             JSONfile.write(jsonObject.toString());
             System.out.println("Data written to file");
             
             JSONfile.close();
		     return Response.ok("Successful")
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Headers", "Content-Type")
					.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS, HEAD" )
					.allow("OPTIONS")
					.build(); 
                }
	     catch (FileNotFoundException e){
	    	System.out.println(e);
	    	return Response.status(Status.NOT_FOUND).build(); 
            	               }
	     catch (IOException e){
	    	System.out.println(e);
		    return Response.status(Status.NOT_FOUND).build(); 
	    	                 }
	 }
}
