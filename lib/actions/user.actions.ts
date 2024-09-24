'use server';
import { clerkClient } from '@clerk/nextjs/server';
import { parse } from 'path';
import { parseStringify } from '../utils';
import { liveblocks } from '../liveblock';

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email),
    );

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error happened while getting users: ${error}`);
  }
};

export const getDocumentUsers = async ({
  text,
  roomId,
  currentUser,
}: {
  text: string;
  roomId: string;
  currentUser: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser,
    );

    if (text.length) {
      const lowerCaseText = text.toLowerCase();

      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText),
      );

      return parseStringify(filteredUsers);
    }
    parseStringify(users);
  } catch (error) {
    console.log(`Error happened while fetching document users: ${error}`);
  }
};
