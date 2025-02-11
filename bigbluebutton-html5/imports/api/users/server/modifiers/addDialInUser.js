import { check } from 'meteor/check';
import addUser from '/imports/api/users/server/modifiers/addUser';

export default async function addDialInUser(meetingId, voiceUser) {
  check(meetingId, String);
  check(voiceUser, Object);

  const USER_CONFIG = Meteor.settings.public.user;
  const ROLE_VIEWER = USER_CONFIG.role_viewer;

  const { intId, callerName } = voiceUser;

  const voiceOnlyUser = {
    intId,
    extId: intId, // TODO
    name: callerName,
    role: ROLE_VIEWER.toLowerCase(),
    guest: true,
    authed: true,
    waitingForAcceptance: false,
    guestStatus: 'ALLOW',
    emoji: 'none',
    presenter: false,
    locked: false, // TODO
    avatar: '',
    pin: false,
    clientType: 'dial-in-user',
  };
  const user = await addUser(meetingId, voiceOnlyUser);
  return user;
}
