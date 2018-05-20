/* @flow */

import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import * as usersAction from '../../actions/user';
import type {
  UserInfo as UserInfoType,
  Dispatch,
  ReduxState
} from '../../types';
import { UserCard } from '../../components';
import styles from './styles.scss';

type Props = {
  userInfo: UserInfoType,
  match: Object,
  fetchUserIfNeeded: (id: string) => void
};

// Export this for unit testing more easily
export class UserInfo extends PureComponent<Props> {
  componentDidMount() {
    const { fetchUserIfNeeded, match } = this.props;

    fetchUserIfNeeded(match.params.id);
  }

  renderUserCard = () => {
    const {
      userInfo,
      match: { params }
    } = this.props;
    const userInfoById = userInfo[params.id];

    if (!userInfoById || userInfoById.readyStatus === 'USER_REQUESTING') {
      return (
        <React.Fragment>
          <Helmet title="Loading..." />
          <p>Loading...</p>
        </React.Fragment>
      );
    } else if (userInfoById.readyStatus === 'USER_FAILURE') {
      return (
        <React.Fragment>
          <Helmet title="Oops!" />
          <p>Oops, Failed to load info!</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <Helmet title={userInfoById.info.name} />
        <UserCard info={userInfoById.info} />
      </React.Fragment>
    );
  };

  render() {
    return <div className={styles.UserInfo}>{this.renderUserCard()}</div>;
  }
}

const connector = connect(
  ({ userInfo }: ReduxState) => ({ userInfo }),
  (dispatch: Dispatch) => ({
    fetchUserIfNeeded: (id: string) =>
      dispatch(usersAction.fetchUserIfNeeded(id))
  })
);

export default compose(withRouter, connector)(UserInfo);
