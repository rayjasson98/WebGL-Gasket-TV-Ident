# WebGL 3D Sierpiński Gasket TV Ident

*[Ray Jasson](mailto:haojie.dev@gmail.com)*<br>
*29/01/2021*<br>

<br>

## :computer: Program Execution

Play around with the 3D gasket using various geometric transformations in the program! [Try it here!](https://rayjasson98.github.io/WebGL-Gasket-TV-Ident)

<p align=center><img src="/docs/img/ui.png"></p>
<p align="center"><i>UI of the WebGL program</i></p>

<br>

### :arrow_down_small: What is a Sierpiński Gasket?

The [Sierpiński Gasket](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle) is a triangular object that can be defined recursively and randomly using subdivisions. The 2D gasket is only a triangle with repeatedly subdivided triangles at smaller sizes, whereas the 3D gasket consists of a tetrahedron with recursively smaller tetrahedrons after subdivision.

<p align=center><img src="/docs/img/sierpinski_gasket.png"></p>
<p align="center"><i>Examples of 3D Sierpiński Gasket</i></p>

<br>

### :arrow_down_small: Geometric Transformations

The 3D gasket can be manipulated in various ways using the provided input parameters:
- **3D Gasket Properties**
  - 4 colours for the face of each triangle (specified using colour pickers)
  - Number of subdivisions (ranging from 1 to 5)
  - Initial scale before the animation starts (ranging from 0.5x to 3x with a step of 0.5x)
- **Animation Properties**
  - Speed of animation in percentage (ranging from 100% to 800%)
  - Scale factor (ranging from 0.5x to 3x with a step of 0.5x)
  - Rotation angle in degree (ranging from 0° to 360° with a step of 10°)
  - Rotation about *x*-axis (can be enabled or disabled)
  - Rotation about *y*-axis (can be enabled or disabled)
  - Translation style including *random*, *rotating*, *dancing*, *flipping* and *paralysing*

<br>

## :black_nib: References

- Angel, E., & Shreiner, D. (2015). *Interactive Computer Graphics* (7th ed.). Pearson Education.
- [A GitHub repository for WebGL examples](https://github.com/esangel/WebGL)
