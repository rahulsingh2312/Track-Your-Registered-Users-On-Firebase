// app/api/userCount/route.js

import admin from 'firebase-admin';


if (!admin.apps.length) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CREDENTIALS);
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
      headers: { 'Content-Type': 'application/json' ,
        'Cache-Control':'no-store',
      },
    });
  } catch (error) {
    console.error('Error fetching user count:', error);
    return new Response(JSON.stringify({ error: 'Unable to fetch user count' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' ,
        'Cache-Control':'no-store',
      },
    });
  }
};
