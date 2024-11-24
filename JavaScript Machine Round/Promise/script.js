// // Synchronous Vs Asynchronous code
// console.log("Start");

// // setTimeout(() => {
// // }, 1000);

// function importantAction(username, cb) {
//   setTimeout(() => {
//     cb("Subscribe to ritik pathak channel  " + username);
//   }, 10000);
// }

// function likeTheVideo(video, cb) {
//   setTimeout(() => {
//     cb(`Like the ${video} here`);
//   }, 5000);
// }

// function shareTheVideo(video, cb) {
//   setTimeout(() => {
//     cb(`share the ${video} here`);
//   }, 1000);
// }

// importantAction("Ritik", (message) => {
//   console.log(message);
//   likeTheVideo("Riitk pathak", (action) => {
//     console.log(action);
//   }),
//     shareTheVideo("Video 1", (action) => {
//       console.log(action);
//     });
// });

// // likeTheVideo("Riitk pathak", (action) => {
// //   console.log(action);
// // });

// console.log("Finish");

// ***************************************Promise***************************************

// console.log("Start");

// const sub = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     const result = true;
//     if (result) {
//       resolve("promise success");
//     } else {
//       reject("promise rejected");
//     }
//   }, 2000);
// });

// console.log(sub)

// // sub.then((res) => console.log(res)).catch((err) => console.log(err));

// console.log("Stop");

console.log("Start");

function importantAction(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username) {
        resolve("Subscribe to ritik pathak channel " + username);
      } else {
        reject("No username provided for subscription.");
      }
    }, 1000);
  });
}

function likeTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (video) {
        resolve(`Like the ${video} here`);
      } else {
        reject("No video provided for liking.");
      }
    }, 5000);
  });
}

function shareTheVideo(video) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (video) {
        resolve(`Share the ${video} here`);
      } else {
        reject("No video provided for sharing.");
      }
    }, 1000);
  });
}

importantAction("rocky")
  .then((res) => {
    console.log(res);
    likeTheVideo("Sunny")
      .then((res) => {
        console.log(res);

        shareTheVideo()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));

console.log("stop");
