'use client';

import Head from 'next/head';
import Script from 'next/script';
import React, { useEffect } from 'react';
import * as THREE from 'three';
import styles from './earth-rotate.module.scss';

const EarthRotate = () => {
  useEffect(() => {
    var canvReference = document.getElementById('earth') as HTMLCanvasElement;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, 1000 / 1000, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas: canvReference,
    });

    /*
	 In addition to creating the renderer instance, we also need to set the size at which we want it to render our app. 
	 It's a good idea to use the width and height of the area we want to fill with our game 
	 - in this case, the width and height of the browser window. For performance intensive games, you can also give setSize smaller values, 
	 like window.innerWidth/2 and window.innerHeight/2, for half the resolution. 
	 This does not mean that the game will only fill half the window, but rather look a bit blurry and scaled up.
	
	 Last but not least, we add the renderer element to our HTML document. 
	 This is a <canvas> element the renderer uses to display the scene to us.
	*/

    renderer.setSize(1000, 1000);
    // document.body.appendChild(renderer.domElement);

    /* Create Lights: PointLight / SpotLight etc.*/
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100, 100, 100);
    spotLight.castShadow = true; //If set to true light will cast dynamic shadows. Warning: This is expensive and requires tweaking to get shadows looking right.
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);

    /* Create Material */
    function Mat() {
      var material = new THREE.MeshPhongMaterial({
        color: new THREE.Color('#144272'), //Diffuse color of the material
        emissive: new THREE.Color('#1E3D59'), //Emissive(light) color of the material, essentially a solid color unaffected by other lighting. Default is black.
        specular: new THREE.Color(
          'rgb(93,195,255)'
        ) /*Specular color of the material, i.e., how shiny the material is and the color of its shine. 
														   Setting this the same color as the diffuse value (times some intensity) makes the material more metallic-looking; 
														   setting this to some gray makes the material look more plastic. Default is dark gray.*/,
        shininess: 1, //How shiny the specular highlight is; a higher value gives a sharper highlight. Default is 30.
        flatShading: true, //How the triangles of a curved surface are rendered: THREE.SmoothShading, THREE.FlatShading, THREE.NoShading
        // wireframeLinewidth: 1, //THREE.Math.randInt(0,1),
        wireframe: true,
        wireframeLinecap: 'round',
        opacity: 0.15, //THREE.Math.randFloat(0,1)
      });
      return material;
    }

    /* Create Geometry */
    var geometry = new THREE.SphereGeometry(
      50,
      12,
      12,
      0,
      Math.PI * 2,
      0,
      Math.PI
    );
    //SphereGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)

    /* Create Earth Sphere*/
    var earth = new THREE.Mesh(geometry, Mat());

    /*
	var numSphere = 30;
	var tabSphere = [];
	for(var i=0: i<numSphere; i++){
	  tabShpere.push(new Sphere(i));
	  scene.add(tabSphere[i].b);
	}
	*/

    scene.add(earth);

    camera.position.z = 90;

    /*
	  This will create a loop that causes the renderer to draw the scene 60 times per second. 
	  If you're new to writing games in the browser, you might say "why don't we just create a setInterval? 
	  The thing is - we could, but requestAnimationFrame has a number of advantages. 
	  Perhaps the most important one is that it pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
	*/
    function render() {
      requestAnimationFrame(render);
      earth.rotation.x += 0.005;
      earth.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    render();
  }, []);

  return <canvas id='earth' className={styles.earth}></canvas>;
};

export default EarthRotate;
