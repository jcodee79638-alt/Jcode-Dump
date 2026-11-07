
function Eqs(e, t) {
  return Zt`(select count(*) from ${e}${Zt.raw(" where ").if(t)}${t})`;
}