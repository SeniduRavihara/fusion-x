// "use client";

// import { useEffect, useRef, useState } from "react";

// const Video = ({ src, scrollHeight }) => {
//   const [duration, setDuration] = useState(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [canPlayThrough, setCanPlayThrough] = useState(false);
//   const videoRef = useRef(null);

//   useEffect(() => {
//     videoRef.current.load();
//   }, []);

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [duration]);

//   const getCurrentTime = () => {
//     const percentScrolled =
//       // window.scrollY / (scrollHeight - window.innerHeight);
//     return duration * percentScrolled;
//   };

//   const handleScroll = (e) => {
//     const time = getCurrentTime();
//     setCurrentTime(time);

//     if (time < duration) {
//       videoRef.current.currentTime = time;
//     }
//   };

//   return (
//     <div className="video-container" style={{ height: scrollHeight }}>
//       {getCurrentTime() < duration && (
//         <small>Time: {currentTime.toFixed(2)}s</small>
//       )}

//       <video
//         onLoadedMetadata={(e) => setDuration(e.target.duration)}
//         onLoadedData={() => videoRef.current.pause()}
//         onCanPlayThrough={() => setCanPlayThrough(true)}
//         ref={videoRef}
//         preload="metadata"
//         muted
//         playsInline
//       >
//         <source src={src} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//       {!canPlayThrough && (
//         <div className="loader">
//           <h1>Loading...</h1>
//         </div>
//       )}
//     </div>
//   );
// };


// const TestSection = () => {
//   return (
//     <div>
//       <Video
//         scrollHeight={4000}
//         src="https://www.apple.com/105/media/us/iphone-12-pro/2020/e70ffbd8-50f1-40f3-ac36-0f03a15ac314/anim/stackable/large.mp4"
//       />
//       <div className="content">
//         <h1>Cras tincidunt lobortis</h1>
//         <p>
//           Gravida quis blandit turpis cursus in. Tellus in metus vulputate eu
//           scelerisque felis. Sed vulputate mi sit amet mauris. Iaculis urna id
//           volutpat lacus laoreet. Duis tristique sollicitudin nibh sit. Dui
//           vivamus arcu felis bibendum ut tristique. Morbi tincidunt augue
//           interdum velit. Diam phasellus vestibulum lorem sed risus ultricies
//           tristique. Varius duis at consectetur lorem donec. Massa sed elementum
//           tempus egestas sed. Tortor condimentum lacinia quis vel eros donec ac
//           odio tempor. Amet mattis vulputate enim nulla aliquet porttitor lacus
//           luctus. Nunc aliquet bibendum enim facilisis. Volutpat sed cras ornare
//           arcu dui vivamus arcu. Faucibus a pellentesque sit amet. Senectus et
//           netus et malesuada fames ac turpis egestas integer. Bibendum at varius
//           vel pharetra vel. Non enim praesent elementum facilisis leo. Pharetra
//           diam sit amet nisl suscipit. Egestas erat imperdiet sed euismod.
//         </p>
//         <p>
//           Tortor aliquam nulla facilisi cras fermentum odio eu feugiat.
//           Suspendisse ultrices gravida dictum fusce ut placerat. Semper risus in
//           hendrerit gravida rutrum quisque non tellus orci. Sed adipiscing diam
//           donec adipiscing tristique risus nec feugiat. Ultrices tincidunt arcu
//           non sodales neque sodales ut etiam sit. Vitae proin sagittis nisl
//           rhoncus mattis rhoncus urna. Ut etiam sit amet nisl purus in mollis
//           nunc. Suspendisse faucibus interdum posuere lorem. Mauris commodo quis
//           imperdiet massa. Pretium vulputate sapien nec sagittis aliquam. Lorem
//           ipsum dolor sit amet consectetur adipiscing elit pellentesque. Auctor
//           eu augue ut lectus arcu bibendum at varius.
//         </p>
//         <p>
//           Commodo viverra maecenas accumsan lacus. Diam vel quam elementum
//           pulvinar etiam non. Turpis egestas integer eget aliquet nibh. Cras
//           tincidunt lobortis feugiat vivamus at augue. Ornare aenean euismod
//           elementum nisi quis. Aliquet enim tortor at auctor urna nunc id
//           cursus. Etiam dignissim diam quis enim lobortis scelerisque fermentum
//           dui. Et odio pellentesque diam volutpat commodo. Euismod nisi porta
//           lorem mollis aliquam ut porttitor leo a. Sollicitudin aliquam ultrices
//           sagittis orci. Netus et malesuada fames ac turpis egestas maecenas
//           pharetra convallis. Facilisi cras fermentum odio eu feugiat pretium
//           nibh ipsum. Leo integer malesuada nunc vel risus commodo. Dapibus
//           ultrices in iaculis nunc sed. Tellus pellentesque eu tincidunt tortor
//           aliquam. Volutpat maecenas volutpat blandit aliquam etiam erat velit
//           scelerisque.
//         </p>
//       </div>
//     </div>
//   )
// }
// export default TestSection