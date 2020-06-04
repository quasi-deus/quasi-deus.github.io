var image = null;
var gs = null, red= null, rb=null,vert=null,ia=null,output=null;
var canvas = null;
/*Important:Javascript takes time to executes code and we must take that into consideration
while executing functions otherwise it won't completely do what it is asked to on time.ex:canvas can't be
defined globally, and gs and red here can't copy values from image on time. */

function upload() 
{
  canvas=document.getElementById("white");
  image=new SimpleImage(document.getElementById("in"));
  gs=new SimpleImage(document.getElementById("in"));
  red=new SimpleImage(document.getElementById("in"));
  rb=new SimpleImage(document.getElementById("in"));
  vert=new SimpleImage(document.getElementById("in"));
  ia=new SimpleImage(document.getElementById("in"));
  image.drawTo(canvas);
}
function reset() 
{
  if (checker(image)) 
  {
    image.drawTo(canvas);
    gs = new SimpleImage(image);
    red = new SimpleImage(image);
    rb=new SimpleImage(image);
    vert=new SimpleImage(image);
    ia=new SimpleImage(image);
  }
}
function checker(image) 
{
  if (image == null || !image.complete()) 
  {
    alert("Insert Image");
    return false;
  } 
  else return true;
 }

 
function Gray() 
{
  if (checker(gs))
   {
    grayscale();
    gs.drawTo(canvas);
  }
}
function Red() 
{
  if (checker(red))
  {
    hueR();
    red.drawTo(canvas);
  }
}
function rainbow() 
{
  if (checker(rb))
  {
    hueVGBGYOR();
    rb.drawTo(canvas);
  }
}
function disorder()
{
    if (checker(image))
    {
      output=new SimpleImage(image.getWidth(),image.getHeight());
      blr();
      output.drawTo(canvas);
    }
}
function invert()
{
    
    if(checker(vert))
    {
        inv();
        vert.drawTo(canvas);
      }

}
function sepia() 
{
    if(checker(ia)) 
    {
      sep();
      ia.drawTo(canvas);
    }
}
function hmirror()
{
    
    if(checker(image))
    {
        output=new SimpleImage(image.getWidth(),image.getHeight());
        hmir();
       output.drawTo(canvas);
      }

}
function vmirror()
{
    
    if(checker(image))
    {
        output=new SimpleImage(image.getWidth(),image.getHeight());
        vmir();
       output.drawTo(canvas);
      }

}
function absmirror()
{
    
    if(checker(image))
    {
        output=new SimpleImage(image.getWidth(),image.getHeight());
        absmir();
       output.drawTo(canvas);
      }

}

//The average of rgb values would give the light intensity and applying it to rgb gives us the grayscale
function grayscale() 
{
  for (var pixel of gs.values()) 
  {
    var average = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(average);
    pixel.setGreen(average);
    pixel.setBlue(average);
  }
}
function hueR() 
{
    //The other colors contribute to brightness as well and hence red must be able to compensate for them too.
  for (var pixel of red.values()) 
  {
    var average=(pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (average<128) 
    {
      pixel.setRed(2*average);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } 
    else 
    {
      pixel.setRed(255);
      pixel.setGreen(2*average-255);
      pixel.setBlue(2*average-255);
    }
  }
}
function hueVGBGYOR()
{
    //similarly for each color in the rainbow
    /* Algorithm for mixed colors is nothing but having a conditional statment until one of rgb reaches maximum
    as the other two primary colors compensate to the brightness with their own corresponding values(ratio) of the 
    hue colors(or its 50%), with the else statement(s) having the reminder of the color.*/
    var height=rb.getHeight();
    for (var pixel of rb.values()) 
    {
      var y=pixel.getY();
      var average=(pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
      if(y<height/7)
      {
        if (average<128) 
        {
            pixel.setRed(2*average);
            pixel.setGreen(0);
            pixel.setBlue(0);
        } 
        else 
        {
            pixel.setRed(255);
            pixel.setGreen(2*average-255);
            pixel.setBlue(2*average-255);
        }
      }
      //orange
      else if(y<2*height/7)
      {
        if (average<128) 
        {
            pixel.setRed(2*average);
            pixel.setGreen(0.5*average);
            pixel.setBlue(0);
        } 
        else 
        {
            pixel.setRed(255);
            pixel.setGreen(1.5*average-127);
            pixel.setBlue(2*average-255);
        } 
      }
      //yellow
      else if(y<3*height/7)
      {
        if (average<128) 
        {
            pixel.setRed(2*average);
            pixel.setGreen(2*average);
            pixel.setBlue(0);
        } 
        else 
        {
            pixel.setRed(255);
            pixel.setGreen(255);
            pixel.setBlue(2*average-255);
        } 
      }
      //green
      else if(y<4*height/7)
      {
        if (average<128) 
        {
            pixel.setRed(0);
            pixel.setGreen(2*average);
            pixel.setBlue(0);
        } 
        else 
        {
            pixel.setRed(2*average-255);
            pixel.setGreen(255);
            pixel.setBlue(2*average-255);
        } 
      }
      //blue
      else if(y<5*height/7)
      {
        if (average<128) 
        {
            pixel.setRed(0);
            pixel.setGreen(0);
            pixel.setBlue(2*average);
        } 
        else 
        {
            pixel.setRed(2*average-255);
            pixel.setGreen(2*average-255);
            pixel.setBlue(255);
        } 
      }
      //indigo
      else if(y<6*height/7)
      {
        if (average<128) 
        {
            pixel.setRed(0.8*average);
            pixel.setGreen(0);
            pixel.setBlue(2*average);
        } 
        else
        {
            pixel.setRed(1.2*average-51);
            pixel.setGreen(2*average-255);  
            pixel.setBlue(255);
        }
      }
      //violet
      else
      {
        if (average<128) 
        {
            pixel.setRed(1.6*average);
            pixel.setGreen(0);
            pixel.setBlue(1.6*average);
        } 
        else 
        {
            pixel.setRed(0.4*average+153); 
            pixel.setGreen(2*average-255);
            pixel.setBlue(0.4*average+153);
        } 
      }
    }  
}



 //For Blurring Images
/*We begin by creating a blank image and writing the loop to let us color each pixel in the image. 
For each pixel we will do one of two things: half the time, we will simply copy the pixel from the old picture 
to the new picture without changing anything. The other half of the time we will find a pixel nearby and copy 
that one instead.Now we must figure out how to find a "nearby" pixel. We will define some value for how far 
away the new pixel will be (we used 10 pixels) and then we write a function that will give a (x,y) point that 
is a random amount between 0 and 10 pixels away in each direction. Before we use the new (x,y) point, we must 
check to be sure it is still a valid pixel position in the image. For example, we may be at a pixel that is on
 the very top of the image. Our random point generator tells us to go up by 3 pixels, but since we are on the 
 top of the image (y = 0) we cannot very well go up by three pixels (y would be -3)! If the random number is 
 too big (larger than the dimension -1) or too small (less than 0) then we will just use the closest number 
 that is valid.Once we have a valid pixel that is some amount away we use its red, green, and blue values 
 as the new pixel's values.*/
 // blur by moving random pixels

 function blr()
{ 
    for (var pixel of image.values()) 
    {
        var x=pixel.getX();
        var y=pixel.getY();
        if (Math.random()>0.5) 
        {
            var other=nearpixel(image, x, y, 20);
            output.setPixel(x, y, other);
        }
        else 
        {
            output.setPixel(x,y,pixel);
        }
    }
}
function nearpixel (image, x, y, blurange) 
{
  var rx=Math.random()*blurange-blurange/2;
  var ry=Math.random()*blurange-blurange/2;
  var ix=inimage(x+rx,image.getWidth());
  var iy=inimage(y+ry,image.getHeight());
  return image.getPixel(ix,iy);
}
function inimage (coordinate, size)
{
  // coordinate cannot be negative
  if (coordinate < 0)
  {
      return 0;
  }
  // coordinate must be in range [0 .. size-1]
  if (coordinate>=size) 
  {
      return size-1;
  }
  return coordinate;
}


/*Inversion: An image when inverted all its values inverted, each RGB value is counted down from the opposite
end of the max and min values */
function inv()
{
 for(var pixel of vert.values())
 {
    var b=255-pixel.getBlue();
    var r=255-pixel.getRed();
    var g=255-pixel.getGreen();
    pixel.setBlue(b);
    pixel.setGreen(g);
    pixel.setRed(r);
    
 }   
}
//Mirror:Just draw an image from the other side of the canvas; the end pixels are the dimensions-1
function hmir()
{
    var X=image.getWidth();
    for (var pixel of image.values()) 
    {
        var x =pixel.getX();   
        var y =pixel.getY();
        output.setPixel(X-x-1,y,pixel);  
    }    
}
function vmir()
{
    var Y=image.getHeight();
    for (var pixel of image.values()) 
    {
        var x =pixel.getX();   
        var y =pixel.getY();
        output.setPixel(x,Y-y-1,pixel);  
    }    
}
function absmir()
{
    var X=image.getWidth();
    var Y=image.getHeight();
    for (var pixel of image.values()) 
    {
        var x =pixel.getX();   
        var y =pixel.getY();
        output.setPixel(X-x-1,Y-y-1,pixel);  
    }    
}
//Sepia: Color combination where red, green, and blue are in specific ranges
function sep() 
{
    for(var pixel of ia.values()) 
    {
      var B=pixel.getBlue();
      var R=pixel.getRed();
      var G=pixel.getGreen();  
      pixel.setRed( 0.393*R + 0.769*G + 0.189*B);
      pixel.setGreen(0.349*R + 0.686*G + 0.168*B);
      pixel.setBlue(0.272*R + 0.534*G + 0.131*B);
    }
}