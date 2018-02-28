import React, { Component } from 'react';
import { T } from '../index'
import { connect } from 'react-redux'; 
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { InputText } from 'primereact/components/inputtext/InputText';
import { Slider } from 'primereact/components/slider/Slider';

class Recommendation extends Component {
  constructor() {
    super();
    this.state = {
      reduceWeight: true,
      reduceSwelling: true,
      tiltFrequency: 0,
      tiltLength: 0,
      tiltAngle: 0,
      reduceMovingSliding: false,
      movingSlidingAngle: 0,
      reduceRestSliding: false,
      restSlidingAngle: 0,
      reducePainChecked: false,
      reducePainRec: null,
      allowRestChecked: false,
      allowRestRec: null,
      easeTransfersChecked: false,
      easeTransfersRec: null,
      improveComfortChecked: false,
      improveComfortRec: null,
      otherChecked: false,
      otherRec: null,
      period: 'day'
    };
  }
  render() {
    const style = {
      height: '80vh',
      input: {
        paddingLeft: '0',
        marginBottom: '1em'
      },
      stickLeft: {
        paddingLeft: '0'
      },
      bold: {
        fontWeight: 'bold'
      }
    };

    return (
      <div style={style}>
        <legend className="text-center header"><h2>{T.translate("recommendations."+ this.props.language)}</h2></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div className="col-sm-12">
            <Checkbox inputId="reduceWeightCheck" label="Reduce weight" onChange={(e) => this.setState({ reduceWeight: e.checked })} checked={this.state.reduceWeight} />
            <label htmlFor="reduceWeightCheck">{T.translate("recommendations.reduceWeight."+ this.props.language)}</label>
          </div>
          <div className="col-sm-12" >
            <Checkbox inputId="reduceSwellingCheck" label="Reduce swelling" onChange={(e) => this.setState({ reduceSwelling: e.checked })} checked={this.state.reduceSwelling} />
            <label htmlFor="reduceSwellingCheck">{T.translate("recommendations.reduceSwelling."+ this.props.language)}</label>
          </div>
          {this.state.reduceSwelling
            ?
              <div>
                <div className="col-sm-12">
                  <span className="col-sm-4" style={style.bold}>{T.translate("recommendations.frequency."+ this.props.language)}</span>
                  <Slider className="col-sm-6" min={0} max={180} onChange={(e) => this.setState({ tiltFrequency: e.value })} step={5} />
                  <span className="col-sm-2" style={style.bold}>{this.state.tiltFrequency} min </span>
                </div>
                <div className="col-sm-12">
                  <span className="col-sm-4" style={style.bold}>{T.translate("recommendations.duration."+ this.props.language)}</span>
                  <Slider className="col-sm-6" min={0} max={30} onChange={(e) => this.setState({ tiltLength: e.value })} />
                  <span className="col-sm-2" style={style.bold}>{this.state.tiltLength} min </span>
                </div>
                <div className="col-sm-12">
                  <span className="col-sm-4" style={style.bold}>{T.translate("recommendations.angle."+ this.props.language)}</span>
                  <Slider className="col-sm-6" min={0} max={90} onChange={(e) => this.setState({ tiltAngle: e.value })} />
                  <span className="col-sm-2" style={style.bold}>{this.state.tiltAngle} &deg; </span>
                </div>
              </div>
            : null}
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="reduceMovingSlideCheck" label="Reduce sliding while moving" onChange={(e) => this.setState({ reduceMovingSliding: e.checked })} checked={this.state.reduceMovingSliding} />
              <label htmlFor="reduceMovingSlideCheck">{T.translate("recommendations.slidingMoving."+ this.props.language)}</label>
            </div>
          </div>
          {this.state.reduceMovingSliding
            ?
              <div className="col-sm-12">
                <span className="col-sm-4" style={style.bold}>{T.translate("recommendations.angle."+ this.props.language)}</span>
                <Slider className="col-sm-6" min={0} max={90} onChange={(e) => this.setState({ movingSlidingAngle: e.value })} />
                <span className="col-sm-2" style={style.bold}>{this.state.movingSlidingAngle} &deg; </span>
              </div>
            : null}
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="reduceRestSlideCheck" label="Reduce sliding at rest" onChange={(e) => this.setState({ reduceRestSliding: e.checked })} checked={this.state.reduceRestSliding} />
              <label htmlFor="reduceRestSlideCheck">{T.translate("recommendations.slidingRest."+ this.props.language)}</label>
            </div>
          </div>
          {this.state.reduceRestSliding
            ?
              <div className="col-sm-12">
                <span className="col-sm-4" style={style.bold}>{T.translate("recommendations.angle."+ this.props.language)}</span>
                <Slider className="col-sm-6" min={0} max={90} onChange={(e) => this.setState({ restSlidingAngle: e.value })} />
                <span className="col-sm-2" style={style.bold}>{this.state.restSlidingAngle} &deg; </span>
              </div>
            : null}
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="reducePainCheck" label="Reduce the pain" onChange={(e) => this.setState({ reducePainChecked: e.checked })} checked={this.state.reducePainChecked} />
              <label htmlFor="reducePainCheck">{T.translate("recommendations.pain."+ this.props.language)}</label>
            </div>
            {this.state.reducePainChecked
            ?
              <div className="col-sm-8" style={style.input}>
                <InputText
                  id="reducePainRec" type="text" className="form-control"
                  placeholder={T.translate("recommendations.pain.recommendation."+ this.props.language)}
                  onChange={(e) => this.setState({ reducePainRec: e.value })}
                  value={this.state.reducePainRec}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="allowRestCheck" label="Allowing rest" onChange={(e) => this.setState({ allowRestChecked: e.checked })} checked={this.state.allowRestChecked} />
              <label htmlFor="allowRestCheck">{T.translate("recommendations.rest."+ this.props.language)}</label>
            </div>
            {this.state.allowRestChecked
            ?
              <div className="col-sm-8" style={style.input}>
                <InputText
                  id="allowRestRec" type="text" className="form-control"
                  placeholder={T.translate("recommendations.rest.recommendation."+ this.props.language)}
                  onChange={(e) => this.setState({ allowRestRec: e.value })}
                  value={this.state.allowRestRec}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="easeTransfersCheck" label="Ease transfers" onChange={(e) => this.setState({ easeTransfersChecked: e.checked })} checked={this.state.easeTransfersChecked} />
              <label htmlFor="easeTransfersCheck">{T.translate("recommendations.transfer."+ this.props.language)}</label>
            </div>
            {this.state.easeTransfersChecked
            ?
              <div className="col-sm-8" style={style.input}>
                <InputText
                  id="easeTransfersRec" type="text" className="form-control"
                  placeholder={T.translate("recommendations.transfer.recommendation."+ this.props.language)}
                  onChange={(e) => this.setState({ easeTransfersRec: e.value })}
                  value={this.state.easeTransfersRec}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="improveComfortCheck" label="Improve comfort" onChange={(e) => this.setState({ improveComfortChecked: e.checked })} checked={this.state.improveComfortChecked} />
              <label htmlFor="improveComfortCheck">{T.translate("recommendations.comfort."+ this.props.language)}</label>
            </div>
            {this.state.improveComfortChecked
            ?
              <div className="col-sm-8" style={style.input}>
                <InputText
                  id="improveComfortRec" type="text" className="form-control"
                  placeholder={T.translate("recommendations.comfort.recommendation."+ this.props.language)}
                  onChange={(e) => this.setState({ improveComfortRec: e.value })}
                  value={this.state.improveComfortRec}
                />
              </div>
            : null}
          </div>
          <div className="col-sm-12">
            <div className="col-sm-4" style={style.stickLeft}>
              <Checkbox inputId="otherCheck" label="Other" onChange={(e) => this.setState({ otherChecked: e.checked })} checked={this.state.otherChecked} />
              <label htmlFor="otherCheck">{T.translate("recommendations.other."+ this.props.language)}</label>
            </div>
            {this.state.otherChecked
            ?
              <div className="col-sm-8" style={style.input}>
                <InputText
                  id="otherRec" type="text" className="form-control"
                  placeholder={T.translate("recommendations.other.recommendation."+ this.props.language)} onChange={(e) => this.setState({ otherRec: e.value })} value={this.state.otherRec}
                />
              </div>
            : null}
          </div>
          <div className="col-md-12 text-center" style={{ marginTop: '2em' }}>
            <button type="submit" className="btn btn-primary btn-lg">{T.translate("save."+ this.props.language)}</button>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {
    language: state.applicationReducer.language
  }
}
export default connect(mapStateToProps)(Recommendation)
