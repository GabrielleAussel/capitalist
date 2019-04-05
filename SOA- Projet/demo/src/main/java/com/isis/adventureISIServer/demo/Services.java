package com.isis.adventureISIServer.demo;


import generated.World;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author gabri
 */
public class Services {

    public World readWorldFromXml() {
        World world = null;
        InputStream input = getClass().getClassLoader().getResourceAsStream("world.xml");
        try {
            JAXBContext cont = JAXBContext.newInstance(World.class);
            Unmarshaller u = cont.createUnmarshaller();
            world = (World) u.unmarshal(new File("world.xml"));

        } catch (Exception e) {
            e.printStackTrace();
        }
        return world;
    }

    public void saveWorldToXml(World world) throws FileNotFoundException {
        OutputStream output = new FileOutputStream("world.xml");
    }

    
}
