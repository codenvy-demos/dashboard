/*
 * Copyright (c) 2015-2016 Codenvy, S.A.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *   Codenvy, S.A. - initial API and implementation
 */
'use strict';

/**
 * This class is handling the controller for the IDE
 * @author Florent Benoit
 */
class IdeCtrl {

  /**
   * Default constructor that is using resource
   * @ngInject for Dependency injection
   */
  constructor (ideSvc, $routeParams, ideLoaderSvc, ideIFrameSvc, codenvyAPI, $rootScope, codenvyWorkspace, $timeout) {
    this.ideSvc = ideSvc;
    this.ideIFrameSvc = ideIFrameSvc;
    this.$rootScope = $rootScope;
    this.codenvyWorkspace = codenvyWorkspace;
    this.codenvyAPI = codenvyAPI;
    this.ideLoaderSvc = ideLoaderSvc;
    this.$timeout = $timeout;
    this.selectedWorkspace = null;
    this.$rootScope.loadingIDE = true;

    $rootScope.wantTokeepLoader = true;
    $rootScope.hideLoader = false;

    // search the selected workspace
    let workspace = $routeParams.workspaceName;
    if (!workspace) {
        this.selectedWorkspaceName = null;
    } else {
      this.selectedWorkspaceName = workspace;
    }

    this.ideIFrameSvc.addIFrame();

    let promise = codenvyWorkspace.fetchWorkspaces();

    promise.then(() => {
      this.updateData();
    }, () => {
      this.updateData();
    });


  }

  displayIDE() {
    this.ideSvc.displayIDE();

  }

  updateData() {
    this.hasData = true;

    this.workspaces = this.codenvyWorkspace.getWorkspaces();
    for (var i = 0; i < this.workspaces.length; i++) {
      if (this.workspaces[i].name === this.selectedWorkspaceName) {
        this.selectedWorkspace = this.workspaces[i];
        this.ideSvc.setSelectedWorkspace(this.selectedWorkspace);
      }
    }

    if (this.selectedWorkspace) {
      // now, check if workspace has been started or not
      if ('RUNNING' === this.selectedWorkspace.status) {
        this.ideSvc.init();
        this.ideSvc.openIde();
      } else if ('STOPPED' === this.selectedWorkspace.status) {
        this.$rootScope.hideIdeLoader = false;
        this.$rootScope.hideLoader = true;
        this.ideSvc.init();
        this.ideSvc.startIde();
      }
    } else {
      this.$rootScope.hideIdeLoader = true;
      this.$rootScope.hideLoader = true;

    }

  }



}

export default IdeCtrl;
