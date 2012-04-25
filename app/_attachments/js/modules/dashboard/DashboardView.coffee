class DashboardView extends Backbone.View

  initialize: ->
    @assessments = new AssessmentListView
      isAdmin : Tangerine.user.isAdmin
      submenu : false

    @render()

  render: ->
    @$el.html "
      <h1>Dashboard</h1>
      <div id='dash_buttons'>
        <input type='radio' id='assessment' name='dash_nav' checked><label for='assessment'>assessments</label>
        <input type='radio' id='account' name='dash_nav'><label for='account'>account</label>
      </div>
      <div id='dash_assessments' class='column'></div>
      <div id='dash_account' class='column'></div>
      "
    @$el.find('#dash_buttons').buttonset()

    @assessments.setElement @$el.find "#dash_assessments"

    

    @trigger "rendered"
  @submenuHandler