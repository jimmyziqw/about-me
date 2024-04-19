import ItemSet from "../components/ItemSet.tsx";
function IntroDeskTopSet({span}:{span:number[]}) {
 
  return (
    <>
      <ItemSet name="desktop" span={span} />
      <ItemSet name="lamp" span={span} />
      <ItemSet name="introWall" span={span} />
    </>
  );
}

export default IntroDeskTopSet;
