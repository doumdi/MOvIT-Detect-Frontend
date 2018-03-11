import React, { Component } from 'react';
import { Slider } from 'primereact/components/slider/Slider';
import { Panel, PanelGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { T } from '../index';

class Goal extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      modifieGoal: false,
      tiltFrequency: 0,
      tiltLength: 0,
      tiltAngle: 0
    };
  }

  toggleEditing() {
    if (this.state.modifieGoal) {
      this.setState({ modifieGoal: false });
      // save goals data
    } else {
      this.setState({ modifieGoal: true });
    }
  }

  render() {
    const style = {
      bar: {
        paddingLeft: '5%',
        paddingRight: '5%'
      },
      bold: {
        fontWeight: 'bold'
      },
      bottom: {
        marginTop: '2em'
      },
      center: {
        textAlign: 'center'
      },
      container: {
        border: '1px solid #ddd',
        paddingBottom: '1em'
      },
      icons: {
        fontSize: 'large'
      },
      modifieButton: {
        padding: '5px',
        marginTop: '5px',
        marginBottom: '5px',
        backgroundColor: 'transparent',
        border: 0
      }
    };
    return (
      <div>
        <legend className="text-center header"><h2>{T.translate(`goals.${this.props.language}`)}</h2></legend>
        <div className="row">
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <div className="col-sm-6" style={style.container}>
              <h4 style={style.center}>{T.translate(`clinician.${this.props.language}`)}</h4>
              <div className="col-sm-12">
                <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltFrequency.${this.props.language}`)}</span>
                <span className="col-sm-6" style={style.bold}>{this.props.tiltFrequency} {T.translate(`time.min.${this.props.language}`)}</span>
              </div>
              <div className="col-sm-12">
                <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltLength.${this.props.language}`)}</span>
                <span className="col-sm-6" style={style.bold}>{this.props.tiltLength} {T.translate(`time.min.${this.props.language}`)} </span>
              </div>
              <div className="col-sm-12">
                <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltAngle.${this.props.language}`)}</span>
                <span className="col-sm-6" style={style.bold}>{this.props.tiltAngle} &deg; </span>
              </div>
            </div>

            <div className="col-sm-6" style={style.container}>
              <div className="col-sm-2" />
              <div className="col-sm-9">
                <h4 style={style.center}>{T.translate(`personnal.${this.props.language}`)}</h4>
              </div>
              <div className="col-sm-1" >
                <button style={style.modifieButton} onClick={() => this.toggleEditing()}>
                  {this.state.modifieGoal
                  ?
                    <i className="fa fa-check" style={style.icons} />
                  :
                    <i className="fa fa-edit" style={style.icons} />
                  }
                </button>
              </div>
              {this.state.modifieGoal
              ?
                <div>
                  <div className="col-sm-12">
                    <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltFrequency.${this.props.language}`)}</span>
                    <Slider className="col-sm-6" min={0} max={180} onChange={(e) => this.setState({ tiltFrequency: e.value })} step={5} />
                    <span className="col-sm-2" style={style.bold}>{this.state.tiltFrequency} {T.translate(`time.min.${this.props.language}`)}</span>
                  </div>
                  <div className="col-sm-12">
                    <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltLength.${this.props.language}`)}</span>
                    <Slider className="col-sm-6" min={0} max={30} onChange={(e) => this.setState({ tiltLength: e.value })} />
                    <span className="col-sm-2" style={style.bold}>{this.state.tiltLength} {T.translate(`time.min.${this.props.language}`)} </span>
                  </div>
                  <div className="col-sm-12">
                    <span className="col-sm-4" style={style.bold}>{T.translate(`goals.tiltAngle.${this.props.language}`)}</span>
                    <Slider className="col-sm-6" min={0} max={90} onChange={(e) => this.setState({ tiltAngle: e.value })} />
                    <span className="col-sm-2" style={style.bold}>{this.state.tiltAngle} &deg; </span>
                  </div>
                </div>
              :
                <div>
                  <div className="col-sm-12">
                    <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltFrequency.${this.props.language}`)}</span>
                    <span className="col-sm-6" style={style.bold}>{this.state.tiltFrequency} {T.translate(`time.min.${this.props.language}`)}</span>
                  </div>
                  <div className="col-sm-12">
                    <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltLength.${this.props.language}`)}</span>
                    <span className="col-sm-6" style={style.bold}>{this.state.tiltLength} {T.translate(`time.min.${this.props.language}`)} </span>
                  </div>
                  <div className="col-sm-12">
                    <span className="col-sm-6" style={style.bold}>{T.translate(`goals.tiltAngle.${this.props.language}`)}</span>
                    <span className="col-sm-6" style={style.bold}>{this.state.tiltAngle} &deg; </span>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
        <h2 style={style.center} >{T.translate(`recommendations.${this.props.language}`)}</h2>
        <div className="row" style={style.bottom}>
          <div className="col-sm-2" />
          <div className="col-sm-8">
            <PanelGroup accordion id="accordion-uncontrolled-example">
              {this.props.reduceSlidingMoving
                &&
                <Panel eventKey="1">
                  <Panel.Heading>
                    <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.slidingMoving.${this.props.language}`)}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    {T.translate(`recommendations.angleRecommandation.${this.props.language}`)} {this.props.tiltAngleMoving} &deg;
                  </Panel.Body>
                </Panel>
              }
              {this.props.reduceSlidingRest
                &&
                <Panel eventKey="2">
                  <Panel.Heading>
                    <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.slidingRest.${this.props.language}`)}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    {T.translate(`recommendations.angleRecommandation.${this.props.language}`)} {this.props.tiltAngleRest} &deg;
                  </Panel.Body>
                </Panel>
              }
              {this.props.reducePain
                &&
                <Panel eventKey="3">
                  <Panel.Heading>
                    <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.pain.${this.props.language}`)}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    {this.props.painRecommendation}
                  </Panel.Body>
                </Panel>
              }
              {this.props.allowRest
                &&
                <Panel eventKey="4">
                  <Panel.Heading>
                    <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.rest.${this.props.language}`)}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body collapsible>
                    {this.props.restRecommendation}
                  </Panel.Body>
                </Panel>
              }
              {this.props.easeTransfers
              &&
              <Panel eventKey="5">
                <Panel.Heading>
                  <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.transfer.${this.props.language}`)}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.props.transferRecommendation}
                </Panel.Body>
              </Panel>
              }
              {this.props.improveComfort
              &&
              <Panel eventKey="6">
                <Panel.Heading>
                  <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.comfort.${this.props.language}`)}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.props.comfortRecommendation}
                </Panel.Body>
              </Panel>
              }
              {this.props.other
              &&
              <Panel eventKey="5">
                <Panel.Heading>
                  <Panel.Title toggle><i className="fa fa-chevron-down" /> {T.translate(`recommendations.other.${this.props.language}`)}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                  {this.props.otherRecommendations}
                </Panel.Body>
              </Panel>
              }
            </PanelGroup>
          </div>
        </div>

      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    reduceWeight: state.applicationReducer.reduceWeight,
    reduceSwelling: state.applicationReducer.reduceSwelling,
    reduceSlidingMoving: state.applicationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.applicationReducer.reduceSlidingRest,
    reducePain: state.applicationReducer.reducePain,
    allowRest: state.applicationReducer.allowRest,
    easeTransfers: state.applicationReducer.easeTransfers,
    improveComfort: state.applicationReducer.improveComfort,
    other:state.applicationReducer.other,
    tiltFrequency: state.applicationReducer.tiltFrequency,
    tiltLength: state.applicationReducer.tiltLength,
    tiltAngle: state.applicationReducer.tiltAngle,
    tiltAngleMoving: state.applicationReducer.tiltAngleMoving,
    tiltAngleRest: state.applicationReducer.tiltAngleRest,
    painRecommendation: state.applicationReducer.painRecommendation,
    restRecommendation: state.applicationReducer.restRecommendation,
    transferRecommendation: state.applicationReducer.transferRecommendation,
    comfortRecommendation: state.applicationReducer.comfortRecommendation,
    otherRecommendations: state.applicationReducer.otherRecommendations
  };
}

export default connect(mapStateToProps)(Goal);
