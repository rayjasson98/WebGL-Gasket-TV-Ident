//////////////////////////////////////////////////////////////////////////////
//
//  Angel.js
//
//////////////////////////////////////////////////////////////////////////////

//----------------------------------------------------------------------------
//
//  Helper functions
//

Float32Array.prototype.type = '';

function _argumentsToArray( args )
{
    return [].concat.apply( [], Array.prototype.slice.apply(args) );
}

//----------------------------------------------------------------------------

function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

//----------------------------------------------------------------------------
//
//  Vector Constructors
//

function vec2()
{
    var result = _argumentsToArray( arguments );
    var out = new Float32Array(2);
    out.type = 'vec2';

    if(result)
    switch ( result.length ) {
      case 0:
        out[0] = 0.0;
        out[1] = 0.0;
        break;
      case 1:
        if(result[0].type != 'vec2') {
        out[0] = result[0];
        out[1] = result[0];
      }
      else {
        out[0] = result[0][0];
        out[1] = result[0][1];
      }
        break;
      case 2:
        out[0] = result[0];
        out[1] = result[1];
        break;
    }
    return out;
}

function vec3()
{
    var result = _argumentsToArray( arguments );
    var out = new Float32Array(3);
    out.type = 'vec3';

    switch ( result.length ) {
    case 0:
      out[0] = 0.0;
      out[1] = 0.0;
      out[2] = 0.0;
      break;
    case 1:
    if(result[0].type != 'vec3') {
      out[0] = result[0];
      out[1] = result[0];
      out[2] = result[0];
    }
    else {
      out[0] = result[0][0];
      out[1] = result[0][1];
      out[2] = result[0][2];
    }
      break;
    case 3:
      out[0] = result[0];
      out[1] = result[1];
      out[2] = result[2];
      break;
    }
    //console.log("args ", result);
    //console.log("out ", out);
    return out;
}

function vec4()
{
    var result = _argumentsToArray( arguments );
    var out = new Float32Array(4);
    out.type = 'vec4';
    switch ( result.length ) {
      case 0:
        out[0] = 0.0;
        out[1] = 0.0;
        out[2] = 0.0;
        out[3] = 0.0;
        break;
      case 1:
      if(result[0].type != 'vec4') {
        out[0] = result[0];
        out[1] = result[0];
        out[2] = result[0];
        out[3] = result[0];
      }
      else {
        out[0] = result[0][0];
        out[1] = result[0][1];
        out[2] = result[0][2];
        out[3] = result[0][3];
      }
        break;
      case 4:
        out[0] = result[0];
        out[1] = result[1];
        out[2] = result[2];
        out[3] = result[3];
        break;
    }
    return out;
}

//----------------------------------------------------------------------------
//
//  Matrix Constructors
//

function mat2()
{
    var v = _argumentsToArray( arguments );
    var out = new Float32Array(4);

    switch ( v.length ) {
    case 0:
        out[0]=out[3]=1.0;
        out[1]=out[2]=0.0;
        break;
    case 1:
      out[0] = v[0][0];
      out[1] = v[0][1];
      out[2] = v[0][2];
      out[3] = v[0][3];

        break;
    case 4:
        out[0] = v[0];
        out[1] = v[1];
        out[2] = v[2];
        out[3] = v[3];
        break;
    }
    out.type = 'mat2';

    return out;
}

//----------------------------------------------------------------------------

function mat3()
{
    var v = _argumentsToArray( arguments );

    var out = new Float32Array(9);
    switch ( v.length ) {
      case 0:
          out[0]=out[4]=out[8]=1.0;
          out[1]=out[2]=out[3]=out[5]=out[6]=out[7]=0.0;
          break;
    case 1:
         for(var i=0; i<9; i++) {
           out[i]=v[0][i];
         }
        break;

    case 9:
    out = new Float32Array(v[0],v[1], v[2],
                            v[3], v[4], v[5],
                            v[6], v[7], v[8]);
        break;
    }
    out.type = 'mat3';

    return out;
}

//----------------------------------------------------------------------------

function mat4()
{
    var v = _argumentsToArray( arguments );

    var out = new Float32Array(16);
    switch ( v.length ) {
    case 0:
      out[0]=out[5]=out[10]=out[15] = 1.0;
      out[1]=out[2]=out[3]=out[4]=out[6]=out[7]=out[8]=out[9]=out[11]=out[12]=out[13]=out[14]=0.0;
      break;

    case 1:
      for(var i=0; i<16; i++) {
        out[i] = v[0][i];
      }
      break;

    case 16:
      for(var i=0; i<16; i++) {
        out[i] = v[i];
      }
      break;
    }
    out.type = 'mat4';

    return out;
}

//----------------------------------------------------------------------------
//
//  Generic Mathematical Operations for Vectors and Matrices
//

function equal( u, v )
{
    if ( u.type != v.type ) { return false; }

    for(i=0; i<u.length; i++) if(u[i]!=v[i]) return false;

    return true;
}

//----------------------------------------------------------------------------

function add( u, v )
{
  if ( u.type != v.type ) {
      throw "add(): trying to add different types";
  }
  if ( u.length != v.length ) {
      throw "add(): trying to add different dimensions";
  }

  var result = new Float32Array(u.length);
  result.type = u.type;
  for(var i=0; i<u.length; i++) {
      result[i] = u[i] + v[i];
  }
  return result;
}

//----------------------------------------------------------------------------

function subtract( u, v )
{
  if ( u.type != v.type ) {
      throw "subtract(): trying to subtract different types";
  }
  if ( u.length != v.length ) {
      throw "subtract(): trying to subtract different dimensions";
  }

  var result = new Float32Array(u.length);
  result.type = u.type;
  for(var i=0; i<u.length; i++) {
      result[i] = u[i] - v[i];
  }
  return result;
}

//----------------------------------------------------------------------------

function mult( u, v )
{
  if((u.type=='mat2'&& v.type=='vec2') || (Array.isArray(v)&&(v.length == 2))) {
    var result = new Float32Array(2);
    result.type = 'vec2';
    result[0] =u[0]*v[0]+u[1]*v[1];
    result[1] =u[2]*v[0]+u[3]*v[1];
    return result;
  }
  else if(u.type=='mat3'&& (v.type=='vec3') || (Array.isArray(v)&&(u.length == v))) {
    var result = new Float32Array(3);
    result.type = 'vec3';
    result[0] =u[0]*v[0]+u[1]*v[1]+u[2]*v[2];
    result[1] =u[3]*v[0]+u[4]*v[1]+u[5]*v[2];
    result[2] =u[6]*v[0]+u[7]*v[1]+u[8]*v[2];
    return result;
  }
  else if(u.type=='mat4'&& (v.type=='vec4') || (Array.isArray(v)&&(v.length == 4))) {
    var result = new Float32Array(4);
    result.type = 'vec3';
    result[0] =u[0]*v[0]+u[1]*v[1]+u[2]*v[2]+u[3]*v[3];
    result[1] =u[4]*v[0]+u[5]*v[1]+u[6]*v[2]+u[7]*v[3];
    result[2] =u[8]*v[0]+u[9]*v[1]+u[10]*v[2]+u[11]*v[3];
    result[3] =u[12]*v[0]+u[13]*v[1]+u[14]*v[2]+u[15]*v[3];
    return result;
  }
  else if (u.type=='mat2'&&v.type=='mat2'){
    result = new Float32Array(4);
    result.type = 'mat2';
    result[0] = u[0]*v[0]+u[1]*v[2];
    result[1] = u[0]*v[1]+u[1]*v[3];
    result[2] = u[2]*v[0]+u[3]*v[2];
    result[3] = u[2]*v[1]+u[3]*v[3];
    return result;
  }
  else if (u.type=='mat3'&&v.type=='mat3'){
    result = new Float32Array(9);
    result.type = 'mat3';
    result[0] = u[0]*v[0]+u[1]*v[3]+u[2]*v[6];
    result[1] = u[0]*v[1]+u[1]*v[4]+u[2]*v[7];
    result[2] = u[0]*v[2]+u[1]*v[5]+u[2]*v[8];
    result[3] = u[3]*v[0]+u[4]*v[3]+u[5]*v[6];
    result[4] = u[3]*v[1]+u[4]*v[4]+u[5]*v[7];
    result[5] = u[3]*v[2]+u[4]*v[5]+u[5]*v[8];
    result[6] = u[6]*v[0]+u[7]*v[3]+u[8]*v[6];
    result[7] = u[6]*v[1]+u[7]*v[4]+u[8]*v[7];
    result[8] = u[6]*v[2]+u[7]*v[5]+u[8]*v[8];
  }
  else if (u.type=='mat4'&&v.type=='mat4'){
    result = new Float32Array(16);
    result.type = 'mat4';
    result[0] = u[0]*v[0]+u[1]*v[4]+u[2]*v[8]+u[3]*v[12];
    result[1] = u[0]*v[1]+u[1]*v[5]+u[2]*v[9]+u[3]*v[13];
    result[2] = u[0]*v[2]+u[1]*v[6]+u[2]*v[10]+u[3]*v[14];
    result[3] = u[0]*v[3]+u[1]*v[7]+u[2]*v[11]+u[3]*v[15];

    result[4] = u[4]*v[0]+u[5]*v[4]+u[6]*v[8]+u[7]*v[12];
    result[5] = u[4]*v[1]+u[5]*v[5]+u[6]*v[9]+u[7]*v[13];
    result[6] = u[4]*v[2]+u[5]*v[6]+u[6]*v[10]+u[7]*v[14];
    result[7] = u[4]*v[3]+u[5]*v[7]+u[6]*v[11]+u[7]*v[15];

    result[8] = u[8]*v[0]+u[9]*v[4]+u[10]*v[8]+u[11]*v[12];
    result[9] = u[8]*v[1]+u[9]*v[5]+u[10]*v[9]+u[11]*v[13];
    result[10] = u[8]*v[2]+u[9]*v[6]+u[10]*v[10]+u[11]*v[14];
    result[11] = u[8]*v[3]+u[9]*v[7]+u[10]*v[11]+u[11]*v[15];

    result[12] = u[12]*v[0]+u[13]*v[4]+u[14]*v[8]+u[15]*v[12];
    result[13] = u[12]*v[1]+u[13]*v[5]+u[14]*v[9]+u[15]*v[13];
    result[14] = u[12]*v[2]+u[13]*v[6]+u[14]*v[10]+u[15]*v[14];
    result[15] = u[12]*v[3]+u[13]*v[7]+u[14]*v[11]+u[15]*v[15];

    console.log("u");
    printm(u);
    console.log("v");
    printm(v);
    console.log("mult");
    printm(result);
    return result;
  }
  else if ( u.type != v.type ) {
      throw "mult(): trying to mult different types";
  }
  else if ( u.length != v.length ) {
      throw "mult(): trying to mult different dimensions";
  }

  else {
    var result = new Float32Array(u.length);
    result.type = u.type;
    for(var i=0; i<u.length; i++) {
      result[i] = u[i] * v[i];
    }
  return result;
  }
}

//----------------------------------------------------------------------------
//
//  Basic Transformation Matrix Generators
//

function translate( x, y, z )
{
    //console.log(arguments.length);
    if(arguments.length!=2 && arguments.length != 3) {
      throw "translate(): not a mat3 or mat4";
    }
    if(arguments.length == 2) {
      result = mat3();
      //result[2] = x;
      //result[5] = y;
      //result[8] = z;
      result[6] = x;
      result[7] = y;
      //result[8] = z;
      return result;
    }
      result = mat4();
      result[3] = x;
      result[7] = y;
      result[11] = z;

      //result[12] = x;
      //result[13] = y;
      //result[14] = z;
      //console.log(x, y, z);

      //console.log("translate", result);
      return result;

}

//----------------------------------------------------------------------------

function rotate( angle, axis )
{
    if ( Array.isArray(axis) ) {
        raxis = vec3( arguments[1][0], arguments[1][1], arguments[1][2] );
    }
    else {
      var raxis = vec3(axis);
    }



    var v = normalize( raxis );

    var x = v[0];
    var y = v[1];
    var z = v[2];

    var c = Math.cos( radians(angle) );
    var omc = 1.0 - c;
    var s = Math.sin( radians(angle) );

    var result = mat4(
        x*x*omc + c,   x*y*omc - z*s, x*z*omc + y*s, 0.0 ,
         x*y*omc + z*s, y*y*omc + c,   y*z*omc - x*s, 0.0 ,
         x*z*omc - y*s, y*z*omc + x*s, z*z*omc + c,   0.0 ,
        0.0, 0.0, 0.0, 1.0
    );
    result.type = 'mat4';
    return result;
}

//----------------------------------------------------------------------------

//legacy function

function scalem( x, y, z )
{
    if ( Array.isArray(x) && x.length == 3 ) {
        z = x[2];
        y = x[1];
        x = x[0];
    }

    var result = mat4();
    result[0] = x;
    result[5] = y;
    result[10] = z;
    result[15] = 1.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  ModelView Matrix Generators
//

function lookAt( eye, at, up )
{
    if ( eye.type != 'vec3') {
        throw "lookAt(): first parameter [eye] must be an a vec3";
    }

    if ( at.type != 'vec3') {
        throw "lookAt(): first parameter [at] must be an a vec3";
    }

    if (up.type != 'vec3') {
        throw "lookAt(): first parameter [up] must be an a vec3";
    }

    if ( equal(eye, at) ) {
        return mat4();
    }

    var v = normalize( subtract(at, eye) );  // view direction vector
    var n = normalize( cross(v, up) );       // perpendicular vector
    var u = normalize( cross(n, v) );        // "new" up vector

    //console.log("v ", v);
    //console.log("n ", n);
    //console.log("u ", u);
    v = negate( v );
    //console.log("v ", v);
    //console.log(v.type, n.type, u.type);

    var result = mat4(
        //n[0], n[1], n[2], -dot(n, eye),
        //u[0], u[1], u[2], -dot(u, eye),
        //v[0], v[1], v[2], -dot(v, eye),
        //0.0, 0.0, 0.0, 1.0
        n[0], u[0], v[0], 0.0,
        n[1], u[1], v[1], 0.0,
        n[2], u[2], v[2], 0.0,
        -dot(n, eye), -dot(u, eye), -dot(v, eye), 1.0
    );
    //console.log("lookAt ");
    //printm(result);
    return result;
}

//----------------------------------------------------------------------------
//
//  Projection Matrix Generators
//

function ortho( left, right, bottom, top, near, far )
{
    if ( left == right ) { throw "ortho(): left and right are equal"; }
    if ( bottom == top ) { throw "ortho(): bottom and top are equal"; }
    if ( near == far )   { throw "ortho(): near and far are equal"; }

    var w = right - left;
    var h = top - bottom;
    var d = far - near;

    var result = new Float32Array(16);
    result.type = "mat4";
    //result[1]=result[2]=result[4]=result[6]=result[8]=result[9]=result[12]=result[13]=result[14]=0.0;
    result[1]=result[2]=result[4]=result[6]=result[8]=result[9]=result[3]=result[7]=result[11]=0.0;
    result[0] = 2.0 / w;
    result[5] = 2.0 / h;
    result[10] = -2.0 / d;
    //result[3] = -(left + right) / w;
    //result[7] = -(top + bottom) / h;
    //result[11] = -(near + far) / d;
    result[12] = -(left + right) / w;
    result[13] = -(top + bottom) / h;
    result[14] = -(near + far) / d;
    result[15] = 1.0;
    //console.log(result);
    return result;
}

//----------------------------------------------------------------------------

function perspective( fovy, aspect, near, far )
{
    var f = 1.0 / Math.tan( radians(fovy) / 2 );
    var d = far - near;

    var result = mat4();
    result[0] = f / aspect;
    result[5] = f;
    result[10] = -(near + far) / d;
    result[14] = -2 * near * far / d;
    result[11] = -1;
    result[15] = 0.0;

    return result;
}

//----------------------------------------------------------------------------
//
//  Matrix Functions
//

function transpose( m )
{
    switch(m.type) {
      case 'mat2':
        var result = mat2(m[0], m[2],
                          m[1], m[3]
                        );
        return result;
        break;

      case 'mat3':
        var result = mat3(m[0], m[4], m[7],
                        m[1], m[5], m[8],
                        m[2], m[6], m[9]
                      );
        return result;
        break;

      case 'mat4':
        var result = mat4(m[0], m[4], m[8], m[12],
                          m[1], m[5], m[9], m[13],
                          m[2], m[6], m[10], m[14],
                          m[3], m[7], m[11], m[15]
        );
        return result;
        break;

      default: throw "transpose(): trying to transpose a non-matrix";
    }
}


//----------------------------------------------------------------------------
//
//  Vector Functions
//

function dot( u, v )
{

  //console.log("u ",u, u.length, u.type);
  //console.log("v ",v, v.length, v.type);
    if(Array.isArray(u)&&Array.isArray(v)) {
      if(u.length == v.length) {
        var sum = 0.0;
        for ( var i = 0; i < u.length; i++ ) {
          sum += u[i] * v[i];
          return sum;
      }
    }
      else throw "dot(): array lengths are not the same ";
    }
    if ( u.type != v.type ) {
      throw "dot(): types are not the same ";
    }
    if (u.type != 'vec2' && u.type != 'vec3' && u.type != 'vec4') {
      throw "dot(): not a vector ";
    }

    var sum = 0.0;
    for ( var i = 0; i < u.length; i++ ) {
        sum += u[i] * v[i];
    }
    //console.log("sum" ,sum, u.length, v.length);
    //console.log(u);
    //console.log(v);
    return sum;
}

//----------------------------------------------------------------------------

function negate( u )
{
    var result = new Float32Array(u.length);
    result.type = u.type;
    for ( var i = 0; i < u.length; ++i ) {
        result[i] = -u[i];
    }

    return result;
}

//----------------------------------------------------------------------------

function cross( u, v )
{
    if ( u.type != 'vec3' && u.type != 'vec4') {
        throw "cross(): first argument is not a vector of at least 3";
    }

    if ( v.type != 'vec3' && v.type != 'vec4') {
        throw "cross(): second argument is not a vector of at least 3";
    }

    var result = vec3(
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    );

    return result;
}

//----------------------------------------------------------------------------

function length( u )
{
    return Math.sqrt( dot(u, u) );
}

//----------------------------------------------------------------------------

function normalize( u, excludeLastComponent )
{
    if(Array.isArray(u)){
          //console.log("normalize array u.type ",u.type)
      var result =[];
      var sum = 0.0;
      for(var i=0; i<u.length; i++) {
        sum += u[i]*u[i];
      }
      sum = Math.sqrt(sum);
      for(var i=0; i<u.length; i++) {
        result.push(u[i]/sum);
      }
      return result;
    }

    switch(u.type) {
      case 'vec2':
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
        var result = vec2(u[0]/len, u[1]/len);
        return result;
      break;
      case 'vec3':
        if(excludeLastComponent) {
          var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]);
          var result = vec3(u[0]/len, u[1]/len, u[2]);
          return result;
          break;
        }
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec3(u[0]/len, u[1]/len, u[2]/len);
        return result;
        break;
      case 'vec4':
      if(excludeLastComponent) {
        var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]);
        var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]);
        return result;
        break;
      }
      var len = Math.sqrt(u[0]*u[0]+u[1]*u[1]+u[2]*u[2]+u[3]*u[3]);
      var result = vec4(u[0]/len, u[1]/len, u[2]/len, u[3]/len);
      return result;
      break;
      default: throw "normalize: not a vector type";
    }
}

//----------------------------------------------------------------------------

function mix( u, v, s )
{
    if ( typeof s !== "number" ) {
        throw "mix: the last paramter " + s + " must be a number";
    }

    if ( u.length != v.length ) {
        throw "vector dimension mismatch";
    }

    var result = new Float32Array(u.length);
    for ( var i = 0; i < u.length; ++i ) {
        result[i] =  (1.0 - s) * u[i] + s * v[i] ;
    }
    switch(u.length){
      case 2:
        result.type = 'vec2';
        break;
      case 3:
        result.type = 'vec3';
        break;
      case 4:
        result.type = 'vec4';
        break;
    }

    return result;
}

//----------------------------------------------------------------------------
//
// Vector and Matrix functions
//

function scale( s, u )
{

  if ( typeof s !== "number" ) {
      throw "scale: the first paramter must be a number";
  }
    if ( u.type!='vec2' && u.type!='vec3' && u.type!='vec4' &&
          u.type!='mat2' && u.type!='mat3' && u.type!='mat4') {
        throw "scale: second parameter is not a vector or matrix";
    }

    var result = new Float32Array(u.length);
    for ( var i = 0; i < u.length; ++i ) {
        result[i] =  s * u[i] ;
        result.type = u.type;
    }

    return result;
}

//----------------------------------------------------------------------------
//
//
//

function flatten( v )
{

    if(!Array.isArray(v)) return v;
    //console.log("in flatten ",Array.isArray(v));
    //console.log(v);
    //console.log(v.length);

    if(typeof(v[0])=='number'){
      var floats = new Float32Array( v.length );

      for(var i = 0; i<v.length; i++)
          floats[i] = v[i];
      //console.log(floats);
      return floats;
    }

    var floats = new Float32Array( v.length*v[0].length  );

    for(var i = 0; i<v.length; i++) for(var j=0; j<v[0].length; j++) {
      floats[i*v[0].length+j] = v[i][j];
      //floats[i*v[0].length+j] = v[j][i];
      //console.log(i, j, v[i][j]);
    }

    //console.log(floats);
    return floats;
}

//----------------------------------------------------------------------------
/*
var sizeof = {
    'vec2' : new Float32Array( flatten(vec2()) ).byteLength,
    'vec3' : new Float32Array( flatten(vec3()) ).byteLength,
    'vec4' : new Float32Array( flatten(vec4()) ).byteLength,
    'mat2' : new Float32Array( flatten(mat2()) ).byteLength,
    'mat3' : new Float32Array( flatten(mat3()) ).byteLength,
    'mat4' : new Float32Array( flatten(mat4()) ).byteLength
};
*/
// new functions 5/2/2015

// printing

function printm(m)
{
     console.log("m.type ", m.type);
    switch(m.type) {
      case 'mat2':
       console.log(m[0], m[1]);
       console.log(m[2], m[3]);
       break;
      case 'mat3':
       console.log(m[0], m[1], m[2]);
       console.log(m[3], m[4], m[5]);
       console.log(m[6], m[7], m[8]);
       break;
      case 'mat4':
        console.log(m[0], m[1], m[2], m[3]);
        console.log(m[4], m[5], m[6], m[7]);
        console.log(m[8], m[9], m[10], m[11]);
        console.log(m[12], m[13], m[14], m[15]);
        break;
      default: throw "printm: not a matrix";
    }
}
// determinants

function det2(m)
{

     return m[0]*m[3]-m[1]*m[2];

}

function det3(m)
{
     var d = m[0]*m[4]*m[7]
           + m[1]*m[5]*m[6]
           + m[2]*m[3]*m[4]
           - m[6]*m[4]*m[2]
           - m[3]*m[1]*m[8]
           - m[0]*m[5]*m[7]
           ;
     return d;
}

function det4(m)
{
     var m0 = mat3(
         m[5], m[6], m[7],
         m[9], m[10], m[11],
         m[13], m[14], m[15]
     );
     var m1 = mat3(
         m[4], m[6], m[7],
         m[8], m[10], m[11],
         m[12], m[14], m[15]
     );
     var m2 = mat3(
         m[4], m[5], m[7],
         m[8], m[9], m[11],
         m[12], m[13], m[15]
     );
     var m3 = mat3(
         m[4], m[5], m[6],
         m[8], m[9], m[10],
         m[12], m[13], m[14]
     );
     return m[0]*det3(m0) - m[1]*det3(m1)
         + m[2]*det3(m2) - m[3]*det3(m3);

}

function det(m)
{
     if(m.type!='mat2'||m.type!='mat3'||m.type!='mat3') throw "det: not a matrix";
     if(m.length == 2) return det2(m);
     if(m.length == 3) return det3(m);
     if(m.length == 4) return det4(m);
}

//---------------------------------------------------------

// inverses

function inverse2(m)
{
     var a = mat2();
     var d = det2(m);
     a[0] = m[3]/d;
     a[1] = -m[2]/d;
     a[2] = -m[1]/d;
     a[3] = m[0]/d;
     return a;
}

function inverse3(m)
{
    var a = mat3();
    var d = det3(m);

    var a00 = mat2(
       m[4], m[5],
       m[7], m[8]
    );
    var a01 = mat2(
       m[3], m[5],
       m[6], m[8]
    );
    var a02 = mat2(
       m[3], m[4],
       m[6], m[7]
    );
    var a10 = mat2(
       m[1], m[2],
       m[7], m[8]
    );
    var a11 = mat2(
       m[0], m[2],
       m[6], m[8]
    );
    var a12 = mat2(
       m[0], m[1],
       m[6], m[7]
    );
    var a20 = mat2(
       m[1], m[2],
       m[4], m[5]
    );
    var a21 = mat2(
       m[0], m[2],
       m[3], m[5]
    );
    var a22 = mat2(
       m[0], m[1],
       m[3], m[4]
    );

   a[0] = det2(a00)/d;
   a[1] = -det2(a10)/d;
   a[2] = det2(a20)/d;
   a[3] = -det2(a01)/d;
   a[4] = det2(a11)/d;
   a[5] = -det2(a21)/d;
   a[6] = det2(a02)/d;
   a[7] = -det2(a12)/d;
   a[8] = det2(a22)/d;

   return a;

}

function inverse4(m)
{
    var a = mat4();
    var d = det4(m);

    var a00 = mat4(
       m[5], m[6], m[7],
       m[9], m[10], m[11],
       m[13], m[14], m[15]
    );
    var a01 = mat4(
       m[4], m[6], m[7],
       m[8], m[10], m[11],
       m[12], m[14], m[15]
    );
    var a02 = mat4(
       m[1][0], m[1][1], m[1][3],
       m[2][0], m[2][1], m[2][3],
       m[3][0], m[3][1], m[3][3]
    );
    var a03 = mat4(
       m[4], m[5], m[6],
       m[8], m[9], m[10],
       m[12], m[13], m[14]
    );
    var a10 = mat4(
       m[1], m[2], m[3],
       m[9], m[10], m[11],
       m[13], m[14], m[15]
    );
    var a11 = mat4(
       m[0], m[2], m[3],
       m[8], m[10], m[11],
       m[12], m[14], m[15]
    );
    var a12 = mat4(
       m[0], m[1], m[3],
       m[8], m[9], m[11],
       m[12], m[13], m[15]
    );
    var a13 = mat4(
       m[0], m[1], m[2],
       m[8], m[9], m[10],
       m[12], m[13], m[14]
    );
    var a20 = mat4(
       m[1], m[2], m[3],
       m[5], m[6], m[7],
       m[13], m[14], m[15]
    );
    var a21 = mat4(
       m[0], m[2], m[3],
       m[4], m[6], m[7],
       m[12], m[14], m[15]
    );
    var a22 = mat4(
       m[0], m[1], m[3],
       m[4], m[5], m[7],
       m[12], m[13], m[15]
    );
    var a23 = mat4(
       m[0][0], m[0][1], m[0][2],
       m[1][0], m[1][1], m[1][2],
       m[3][0], m[3][1], m[3][2]
    );

    var a30 = mat4(
       m[1], m[2], m[3],
       m[5], m[6], m[7],
       m[9], m[10], m[11]
    );
    var a31 = mat4(
       m[0], m[2], m[3],
       m[4], m[6], m[7],
       m[8], m[10], m[11]
    );
    var a32 = mat4(
       m[0], m[1], m[3],
       m[4], m[5], m[7],
       m[8], m[9], m[11]
    );
    var a33 = mat4(
       m[0], m[1], m[2],
       m[4], m[2], m[3],
       m[8], m[9], m[10]
    );



   a[0] = det3(a00)/d;
   a[1] = -det3(a10)/d;
   a[2] = det3(a20)/d;
   a[3] = -det3(a30)/d;
   a[4] = -det3(a01)/d;
   a[5] = det3(a11)/d;
   a[6] = -det3(a21)/d;
   a[7] = det3(a31)/d;
   a[8] = det3(a02)/d;
   a[9] = -det3(a12)/d;
   a[10] = det3(a22)/d;
   a[11] = -det3(a32)/d;
   a[12] = -det3(a03)/d;
   a[13] = det3(a13)/d;
   a[14] = -det3(a23)/d;
   a[15] = det3(a33)/d;

   return a;
}
function inverse(m)
{
   if(m.type!='mat2'&&m.type!='mat3'&&m.type!='mat4') throw "inverse: not a matrix";
   if(m.length == 2) return inverse2(m);
   if(m.length == 3) return inverse3(m);
   if(m.length == 4) return inverse4(m);
}

function normalMatrix(m, flag)
{
    var a = mat4();
    a = inverse(transpose(m));
    if(flag != true) return a;
    else {
    var b = mat3(a[0], a[1], a[2],
                 a[4], a[5], a[6],
                 a[8], a[9], a[10]
               );
    return b;
    }

}
