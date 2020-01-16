import React from 'react';
import { connect } from 'react-redux';
import { AdDetailInfo } from './AdDetailInfo';
import AdMap from './AdMap';
import Booking from 'components/booking/Booking';

import * as actions from 'actions';

class AdDetail extends React.Component {

  componentWillMount() {
    // Dispatch action
    const adId = this.props.match.params.id;

    this.props.dispatch(actions.fetchAdById(adId));
  }
  render() {
    const { ad } = this.props;

    if (ad._id) {
      return (
        <section id='adDetails'>
          <div className='upper-section'>
            <div className='row'>
              <div className='col-md-6'>
                <img src={ad.image} alt=''></img>
              </div>

                  <div className='col-md-6'>
                        <AdMap location={`${ad.city}, ${ad.street}`} />
                  </div>         
            </div>
          </div>

          <div className='details-section'>
            <div className='row'>
            <div className='col-md-8'>
                <AdDetailInfo ad={ad} />
              </div>
              
              <div className='col-md-4'>
               <Booking ad={ad} />
              </div>
            </div>
          </div>
        </section>
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

export default connect(mapStateToProps)(AdDetail)
