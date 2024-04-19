

 function Subtitle({text}:{text:string}) {
    if (!text) {
      console.log("Subtitle not found");
    }
    return (
    <div className="subtitle">
        {text}
    </div>
    )
  };

  export default Subtitle;