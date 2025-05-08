// import React from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';

// // Post template component
// const Post = ({ post, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.postContainer} onPress={() => onPress(post)}>
//       <Image
//         source={require('../assets/classroom.png')} // Replace with your image path
//         style={styles.postImage}
//       />
//       <View style={styles.textContainer}>
//         <Text style={styles.boxText}>Session No: {post.trainingSessionNo}</Text>
//         <Text style={styles.amountText}>Topic: {post.topicName}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// // Detail view component
// const PostDetail = ({ post, visible, onClose }) => {
//   return (
//     <Modal
//       visible={visible}
//       animationType="slide"
//       onRequestClose={onClose}
//     >
//       <ScrollView style={styles.modalContainer}>
//         {post ? (
//           <>
//             <Text style={styles.detailTitle}>Training Session Details</Text>
//             <Text style={styles.detailLabel}>Session No: <Text style={styles.detailValue}>{post.trainingSessionNo}</Text></Text>
//             <Text style={styles.detailLabel}>Topic Name: <Text style={styles.detailValue}>{post.topicName}</Text></Text>
//             <Text style={styles.detailLabel}>Trainer Name: <Text style={styles.detailValue}>{post.trainerName}</Text></Text>
//             <Text style={styles.detailLabel}>Training Type: <Text style={styles.detailValue}>{post.trainingType}</Text></Text>
//             <Text style={styles.detailLabel}>Category: <Text style={styles.detailValue}>{post.category}</Text></Text>
//             <Text style={styles.detailLabel}>Department: <Text style={styles.detailValue}>{post.department}</Text></Text>
//             <Text style={styles.detailLabel}>Designation: <Text style={styles.detailValue}>{post.designation}</Text></Text>
//             <Text style={styles.detailLabel}>Date: <Text style={styles.detailValue}>{post.date}</Text></Text>
//             <Text style={styles.detailLabel}>Feedback link: <Text style={styles.detailValue}>{post.feedbacklink}</Text></Text>
//             <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </>
//         ) : (
//           <Text>Loading...</Text>
//         )}
//       </ScrollView>
//     </Modal>
//   );
// };

// // Sample post data
// const postsData = [
//   {
//     id: '1',
//     trainingSessionNo: 'TS001',
//     topicName: 'React Native Basics',
//     trainerName: 'John Doe',
//     trainingType: 'Technical',
//     category: 'Software Development',
//     department: 'IT',
//     designation: 'Developer',
//     date: '2025-05-01',
//     feedbacklink: "https:www.google.com",
//   },
//   {
//     id: '2',
//     trainingSessionNo: 'TS002',
//     topicName: 'Advanced JavaScript',
//     trainerName: 'Jane Smith',
//     trainingType: 'Technical',
//     category: 'Web Development',
//     department: 'IT',
//     designation: 'Senior Developer',
//     date: '2025-05-02',
//     feedbacklink: 'https:www.yahoo.com',
//   },
// ];

// // Main component
// const App = () => {
//   const [selectedPost, setSelectedPost] = React.useState(null);

//   const handlePostPress = (post) => {
//     setSelectedPost(post);
//   };

//   const handleCloseDetail = () => {
//     setSelectedPost(null);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={postsData}
//         renderItem={({ item }) => <Post post={item} onPress={handlePostPress} />}
//         keyExtractor={(item) => item.id}
//       />
//       <PostDetail post={selectedPost} visible={!!selectedPost} onClose={handleCloseDetail} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   postContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#4a4a4a',
//     borderRadius: 20,
//     marginTop: 30,
//     width: 350,
//     marginLeft: 30,
//   },
//   postImage: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   boxText: {
//   priority: 1,
//     fontSize: 16,
//     color: '#fff',
//   },
//   amountText: {
//   priority: 2,
//     fontSize: 18,
//     color: '#ff0000',
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     padding: 20,
//     flex: 1,
//   },
//   detailTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   detailLabel: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   detailValue: {
//     fontWeight: 'normal',
//   },
//   closeButton: {
//     padding: 10,
//     backgroundColor: '#0066cc',
//     borderRadius: 5,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });

// export default App;

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';

// Post template component
const Post = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.postContainer} onPress={() => onPress(post)}>
      <Image
        source={require('../assets/classroom.png')} // Replace with your image path
        style={styles.postImage}
      />
      <View style={styles.textContainer}>
        <Text style={styles.sessionText}>Session No: {post.trainingSessionNo}</Text>
        <Text style={styles.topicText}>Topic: {post.topicName}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Detail view component
const PostDetail = ({ post, visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <ScrollView style={styles.modalContainer}>
        {post ? (
          <>
            <Text style={styles.detailTitle}>Training Session Details</Text>
            <Text style={styles.detailLabel}>Session No: <Text style={styles.detailValue}>{post.trainingSessionNo}</Text></Text>
            <Text style={styles.detailLabel}>Topic Name: <Text style={styles.detailValue}>{post.topicName}</Text></Text>
            <Text style={styles.detailLabel}>Trainer Name: <Text style={styles.detailValue}>{post.trainerName}</Text></Text>
            <Text style={styles.detailLabel}>Training Type: <Text style={styles.detailValue}>{post.trainingType}</Text></Text>
            <Text style={styles.detailLabel}>Category: <Text style={styles.detailValue}>{post.category}</Text></Text>
            <Text style={styles.detailLabel}>Department: <Text style={styles.detailValue}>{post.department}</Text></Text>
            <Text style={styles.detailLabel}>Designation: <Text style={styles.detailValue}>{post.designation}</Text></Text>
            <Text style={styles.detailLabel}>Date: <Text style={styles.detailValue}>{post.date}</Text></Text>
            <Text style={styles.detailLabel}>Feedback link: <Text style={styles.detailValue}>{post.feedbacklink}</Text></Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </Modal>
  );
};

// Sample post data
const postsData = [
  {
    id: '1',
    trainingSessionNo: 'TS001',
    topicName: 'React Native Basics',
    trainerName: 'John Doe',
    trainingType: 'Technical',
    category: 'Software Development',
    department: 'IT',
    designation: 'Developer',
    date: '2025-05-01',
    feedbacklink: "https:www.google.com",
  },
  {
    id: '2',
    trainingSessionNo: 'TS002',
    topicName: 'Advanced JavaScript',
    trainerName: 'Jane Smith',
    trainingType: 'Technical',
    category: 'Web Development',
    department: 'IT',
    designation: 'Senior Developer',
    date: '2025-05-02',
    feedbacklink: 'https:www.yahoo.com',
  },
];

// Main component
const App = () => {
  const [selectedPost, setSelectedPost] = React.useState(null);

  const handlePostPress = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDetail = () => {
    setSelectedPost(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={postsData}
        renderItem={({ item }) => <Post post={item} onPress={handlePostPress} />}
        keyExtractor={(item) => item.id}
      />
      <PostDetail post={selectedPost} visible={!!selectedPost} onClose={handleCloseDetail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background for the main container
  },
  postContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff', // White background for the post card
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postImage: {
    width: 50,
    height: 50,
    marginRight: 15,
    // borderRadius: 10,
  },
  textContainer: {
    flex: 1,
  },
  sessionText: {
    fontSize: 16,
    color: '#000000', // Black color for session text
    marginBottom: 5,
  },
  topicText: {
    fontSize: 18,
    color: '#0066cc', // Blue color for topic text
    fontWeight: 'bold',
  },
  modalContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  detailValue: {
    fontWeight: 'normal',
    color: '#666',
  },
  closeButton: {
    padding: 15,
    backgroundColor: '#0066cc',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;