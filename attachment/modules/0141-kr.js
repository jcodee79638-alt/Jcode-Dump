
const kr = `
struct Uniforms {
  offsetX      : f32,
  offsetY      : f32,
  scaleX       : f32,
  scaleY       : f32,
  paddedWidth  : f32,
  paddedHeight : f32,
  borderSize   : f32,
  _pad         : f32,
};

@group(0) @binding(0) var<uniform> u : Uniforms;

struct VertexInput {
  @location(0) position : vec2<f32>,
  @location(1) color    : vec4<f32>,
};

struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0)       color    : vec3<f32>,
};

@vertex
fn vs_main(in : VertexInput) -> VertexOutput {
  var out : VertexOutput;
  let cx = (in.position.x + u.offsetX) * u.scaleX;
  let cy = (in.position.y + u.offsetY) * u.scaleY;
  out.position = vec4<f32>(
    ((cx + u.borderSize) / u.paddedWidth) * 2.0 - 1.0,
    1.0 - ((cy + u.borderSize) / u.paddedHeight) * 2.0,
    0.0,
    1.0
  );
  out.color = in.color.rgb;
  return out;
}

@fragment
fn fs_main(in : VertexOutput) -> @location(0) vec4<f32> {
  return vec4<f32>(in.color, 1.0);
}
`;