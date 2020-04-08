import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResouces = (mir: MatIconRegistry, ds: DomSanitizer) => {
  const imgDir = 'assets/img';
  const iconDir = `${imgDir}/icons`;
  mir.addSvgIcon('settings_applications', ds.bypassSecurityTrustResourceUrl(`${iconDir}/settings_applications-24px.svg`));
  mir.addSvgIcon('add', ds.bypassSecurityTrustResourceUrl(`${iconDir}/add.svg`));
};
