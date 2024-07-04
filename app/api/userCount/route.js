// app/api/userCount/route.js

import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = require('./nutrisnap-e6cf9-firebase-adminsdk-xw1qk-8066cb8ec9.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const GET = async (req) => {
  try {
    let userCount = 0;
    let nextPageToken;

    // Loop through paginated results
    do {
      const userRecords = await admin.auth().listUsers(1000, nextPageToken);
      userCount += userRecords.users.length;
      nextPageToken = userRecords.pageToken;
    } while (nextPageToken);

    return new Response(JSON.stringify({ count: userCount }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return new Response(JSON.stringify({ error: 'Unable to fetch user count' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
