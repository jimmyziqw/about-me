import { useFrame, useThree } from "@react-three/fiber";

export function CameraStateDisplay({ positionRef, rotationRef }: any) {
    if (process.env.NODE_ENV !== "development") {
      return null;
    }
    const { camera } = useThree();
    useFrame(() => {
      if (positionRef.current && rotationRef.current) {
        positionRef.current.textContent = `"pos": [${camera.position
          .toArray()
          .map((p) => p.toFixed(3))
          .join(", ")}]`;
        rotationRef.current.textContent = `"rot": [${camera.rotation
          .toArray()
          .map((r) => typeof r == "number" && ((r / Math.PI) * 180).toFixed(3))
          .slice(0, 3)
          .join(", ")}]`;
      }
    });
    return null;
  }
  
export function CameraStateOutsideCanvas({ positionRef, rotationRef }: any) {
    if (process.env.NODE_ENV !== "development") {
      return null;
    }
    const handleCopyClick = () => {
      const positionText = positionRef.current?.textContent || "";
      const rotationText = rotationRef.current?.textContent || "";
  
      const cameraState = `"camera":{${positionText}, ${rotationText}, "zoom":null, "fov":null},`;
  
      // Copy camera state to clipboard
      navigator.clipboard
        .writeText(cameraState)
        .then(() => {
          console.log("Camera state copied to clipboard");
        })
        .catch((err) => {
          console.error("Failed to copy camera state", err);
        });
    };
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "white",
            zIndex: 100,
          }}
        >
          <p ref={positionRef}>Position: </p>
          <p ref={rotationRef}>Rotation: </p>
          <button onClick={handleCopyClick}>Copy Camera State</button>
        </div>
      </>
    );
  }