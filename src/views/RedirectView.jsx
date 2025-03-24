// <script setup>
//
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useRoute } from 'vue-router';
//
// const route = useRoute();
//
// const id = route.params.id;
//
// const docRef = doc(db, "short_links", id);
// const docSnap = await getDoc(docRef);
//
// if (docSnap.exists()) {
//   window.location.href = docSnap.data().url;
// } else {
//   console.log("unknown source");
// }
//
// </script>
//
// <template>
//   <div>
//     <p>Redirecting ... </p>
//   </div>
// </template>
