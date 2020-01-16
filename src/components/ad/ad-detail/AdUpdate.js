import React from 'react';
import { connect } from 'react-redux';
import AdMap from './AdMap';
import Booking from 'components/booking/Booking';

import { UserGuard } from '../../shared/auth/UserGuard';
import { AdAssets } from './AdAssets';
import { toUpperCase } from 'helpers';

import { EditableInput } from '../../shared/editable/EditableInput';
import { EditableText } from '../../shared/editable/EditableText';
import { EditableSelect } from '../../shared/editable/EditableSelect';
import { EditableImage } from '../../shared/editable/EditableImage';

import * as actions from 'actions';

class AdUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }

    this.updateAd = this.updateAd.bind(this);
    this.resetAdErrors = this.resetAdErrors.bind(this);
    this.verifyAdOwner = this.verifyAdOwner.bind(this);
  }

  componentWillMount() {
    // Dispatch action
    const adId = this.props.match.params.id;

    this.props.dispatch(actions.fetchAdById(adId));
  }

  componentDidMount() {
    this.verifyAdOwner();
  }

  updateAd(adData) {
    const {ad: {_id}, dispatch } = this.props;

    dispatch(actions.updateAd(_id, adData));
  }

  resetAdErrors() {
    this.props.dispatch(actions.resetAdErrors());
  }

  verifyAdOwner() {
    const adId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyAdOwner(adId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { ad, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (ad._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='adDetails'>
            <div className='upper-section'>
              <div className='row'>
                <div className='col-md-6'>
                  <EditableImage entity={ad}
                                 entityField={'image'}
                                 errors={errors}
                                 updateEntity={this.updateAd}> </EditableImage>
                </div>
                <div className='col-md-6'>
                  <AdMap location={`${ad.city}, ${ad.street}`} />
                </div>
              </div>
            </div>

            <div className='details-section'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='ad'>
                    <label className={`ad-label ad-type ${ad.category}`}> Shared </label>
                    <EditableSelect entity={ad}
                                    entityField={'shared'}
                                    className={`ad-type ${ad.category}`}
                                    updateEntity={this.updateAd}
                                    options={[true, false]}
                                    containerStyle={{'display': 'inline-block'}}
                                    errors={errors}
                                    resetErrors={this.resetAdErrors} />

                    <EditableSelect entity={ad}
                                    entityField={'category'}
                                    className={`ad-type ${ad.category}`}
                                    updateEntity={this.updateAd}
                                    options={['apartment', 'house', 'condo']}
                                    errors={errors}
                                    resetErrors={this.resetAdErrors} />


                    <div className="ad-owner">
                      <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="owner"/>
                      <span>{ad.user && ad.user.username}</span>
                    </div>

                    <EditableInput entity={ad}
                                   entityField={'title'}
                                   className={'ad-title'}
                                   updateEntity={this.updateAd}
                                   errors={errors}
                                   resetErrors={this.resetAdErrors}  />

                    <EditableInput entity={ad}
                                   entityField={'city'}
                                   className={'ad-city'}
                                   updateEntity={this.updateAd}
                                   errors={errors}
                                   formatPipe={[toUpperCase]}
                                   resetErrors={this.resetAdErrors} />

                    <EditableInput entity={ad}
                                   entityField={'street'}
                                   className={'ad-street'}
                                   updateEntity={this.updateAd}
                                   errors={errors}
                                   resetErrors={this.resetAdErrors} />

                    <div className='ad-room-info'>
                      <span><i className='fa fa-building'></i>
                        <EditableInput entity={ad}
                                   entityField={'bedrooms'}
                                   className={'ad-bedrooms'}
                                   containerStyle={{'display': 'inline-block'}}
                                   updateEntity={this.updateAd}
                                   errors={errors}
                                   resetErrors={this.resetAdErrors}  /> bedrooms</span>
                      <span><i className='fa fa-user'></i> {ad.bedrooms + 4} guests</span>
                      <span><i className='fa fa-bed'></i> {ad.bedrooms + 2} beds</span>
                    </div>
                    <EditableText  entity={ad}
                                   entityField={'description'}
                                   className={'ad-description'}
                                   updateEntity={this.updateAd}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetAdErrors}  />
                    <hr></hr>
                    <AdAssets />
                  </div>
                </div>
                <div className='col-md-4'>
                 <Booking ad={ad} />
                </div>
              </div>
            </div>
          </section>
        </UserGuard>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    ad: state.ad.data,
    errors: state.ad.errors
  }
}

export default connect(mapStateToProps)(AdUpdate)
