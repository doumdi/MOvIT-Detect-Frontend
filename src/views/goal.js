import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tooltip } from 'primereact/components/tooltip/Tooltip';
import { GoalActions } from '../redux/goalReducer';
import { T } from '../utilities/translator';
import PressureRecPanel from '../components/pressureRecPanel';
import RecPanel from '../components/recPanel';


class Goal extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    swellingRecommendation: PropTypes.string,
    painRecommendation: PropTypes.string,
    restRecommendation: PropTypes.string,
    transferRecommendation: PropTypes.string,
    comfortRecommendation: PropTypes.string,
    otherRecommendations: PropTypes.string,
    reduceWeight: PropTypes.bool,
    reduceSlidingMoving: PropTypes.bool.isRequired,
    tiltAngleMoving: PropTypes.number.isRequired,
    tiltAngleRest: PropTypes.number.isRequired,
    allowRest: PropTypes.bool.isRequired,
    easeTransfers: PropTypes.bool.isRequired,
    improveComfort: PropTypes.bool.isRequired,
    other: PropTypes.bool.isRequired,
    otherRecommendationsTitle: PropTypes.bool,
    reduceSlidingRest: PropTypes.bool.isRequired,
    reduceSwelling: PropTypes.bool.isRequired,
    reducePain: PropTypes.bool.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      swellingRecommendation: props.swellingRecommendation,
      painRecommendation: props.painRecommendation,
      restRecommendation: props.restRecommendation,
      transferRecommendation: props.transferRecommendation,
      comfortRecommendation: props.comfortRecommendation,
      otherRecommendations: props.otherRecommendations,
    };
  }

  render() {
    const style = {
      chair: {
        textAlign: 'center',
        marginTop: '1em',
      },
      panelGroup: {
        height: '80em',
        maxHeight: '150em',
        overflowY: 'auto',
      },
    };

    return (
      <div>
        <legend className="text-center header">
          <h2>
            {T.translate(`goals.${this.props.language}`)} &nbsp;
            <i id="titleInfo" className="fa fa-info-circle" />
          </h2>
        </legend>
        {!this.props.reduceWeight && !this.props.reduceSwelling
          && !this.props.reduceSlidingMoving && !this.props.reducePain
          && !this.props.allowRest && !this.props.easeTransfers
          && !this.props.improveComfort && !this.props.other
          &&
          <h3 style={style.chair}>{T.translate(`goals.noRecommendations.${this.props.language}`)}</h3>
        }
        <div className="row" style={style.panelGroup}>
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <PressureRecPanel />
            <RecPanel
              condition={this.props.reduceSlidingMoving}
              title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
              value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
              ${this.props.tiltAngleMoving}°
              ${T.translate(`goals.reduceSlidingMoving.${this.props.language}`)}`}
            />
            <RecPanel
              condition={this.props.reduceSlidingRest}
              title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
              value={`${T.translate(`recommendations.angleRecommandation.${this.props.language}`)}
              ${this.props.tiltAngleRest}°
              ${T.translate(`goals.reduceSlidingRest.${this.props.language}`)}`}
            />
            <RecPanel
              condition={this.props.reduceSwelling}
              title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
              value={this.state.swellingRecommendation === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.state.swellingRecommendation}
            />
            <RecPanel
              condition={this.props.reducePain}
              title={T.translate(`recommendations.pain.${this.props.language}`)}
              value={this.state.painRecommendation === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.state.painRecommendation}
            />
            <RecPanel
              condition={this.props.allowRest}
              title={T.translate(`recommendations.rest.${this.props.language}`)}
              value={this.state.restRecommendation === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.state.restRecommendation}
            />
            <RecPanel
              condition={this.props.easeTransfers}
              title={T.translate(`recommendations.transfer.${this.props.language}`)}
              value={this.state.transferRecommendation === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.state.transferRecommendation}
            />
            <RecPanel
              condition={this.props.improveComfort}
              title={T.translate(`recommendations.comfort.${this.props.language}`)}
              value={this.state.comfortRecommendation === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.state.comfortRecommendation}
            />
            <RecPanel
              condition={this.props.other}
              title={this.props.otherRecommendationsTitle === undefined ?
                T.translate(`recommendations.otherTitle.${this.props.language}`) :
                this.props.otherRecommendationsTitle}
              value={this.props.otherRecommendations === undefined ?
                T.translate(`recommendations.tiltAsNeeded.${this.props.language}`) :
                this.props.otherRecommendations}
            />

          </div>

        </div>
        <Tooltip
          for="#titleInfo"
          title={T.translate(`toolTip.goals.${this.props.language}`)}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    reduceSwelling: state.recommendationReducer.reduceSwelling,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reducePain: state.recommendationReducer.reducePain,
    allowRest: state.recommendationReducer.allowRest,
    easeTransfers: state.recommendationReducer.easeTransfers,
    improveComfort: state.recommendationReducer.improveComfort,
    other: state.recommendationReducer.other,
    tiltAngleMoving: state.recommendationReducer.tiltAngleMoving,
    tiltAngleRest: state.recommendationReducer.tiltAngleRest,
    swellingRecommendation: state.recommendationReducer.swellingRecommendation,
    painRecommendation: state.recommendationReducer.painRecommendation,
    restRecommendation: state.recommendationReducer.restRecommendation,
    transferRecommendation: state.recommendationReducer.transferRecommendation,
    comfortRecommendation: state.recommendationReducer.comfortRecommendation,
    otherRecommendations: state.recommendationReducer.otherRecommendations,
    otherRecommendationsTitle: state.recommendationReducer.otherRecommendationsTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeTiltFrequencyGoal: GoalActions.changeTiltFrequencyGoal,
    changeTiltLengthGoal: GoalActions.changeTiltLengthGoal,
    changeTiltAngleGoal: GoalActions.changeTiltAngleGoal,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Goal);
