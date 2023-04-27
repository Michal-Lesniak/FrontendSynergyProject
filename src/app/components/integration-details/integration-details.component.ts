import { VersionBudget } from './../../models/versionBudget';
import { ImageService } from './../../services/image/image.service';
import { SubcategoryService } from './../../services/subcategory/subcategory.service';
import { CategoryService } from './../../services/category/category.service';
import { VersionService } from './../../services/version/version.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { forkJoin, take } from 'rxjs';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-integration-details',
  templateUrl: './integration-details.component.html',
  styleUrls: ['./integration-details.component.css']
})
export class IntegrationDetailsComponent implements OnInit {

  integration_id?: number;
  integration?: IntegrationDetail;
  listVersion?: Array<VersionBudget> = [];
  mainVersion?: VersionBudget;
  tempVersion?: VersionBudget;
  imageURL?: SafeUrl;

  constructor(private router: Router,
    private integrationService: IntegrationService,
    private versionService: VersionService,
    private imageService: ImageService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService) {
    this.integration_id = (router.getCurrentNavigation()?.extras.state)!['id'];
  }

  ngOnInit(): void {
    this.integrationService.getIntegrationById(this.integration_id!).subscribe(integration => { this.integration = integration });
    this.imageService.getImageById(this.integration_id!).subscribe(res => {
      const reader = new FileReader();
      reader.readAsDataURL(res);
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
    });
    this.versionService.getVersionFromIntegration(this.integration_id!).subscribe(listversion => {
      this.listVersion = listversion;
      this.mainVersion = this.listVersion.shift();
      this.tempVersion = this.listVersion[this.listVersion.length - 1];
    });
  }

  selected(version: VersionBudget) {
    this.tempVersion = version;
  }

  setMainVersion(version: VersionBudget) {
    this.listVersion?.push(this.mainVersion!);
    this.listVersion = this.listVersion?.filter(val => val.id != this.tempVersion!.id);
    this.tempVersion = this.mainVersion;
    this.mainVersion = version;

  }

  deleteVersion(version: VersionBudget) {
    this.versionService.deleteVersion(version.id!).subscribe(res => {
      this.listVersion = this.listVersion?.filter(val => val.id != version.id);
      this.tempVersion = this.listVersion![this.listVersion!.length - 1];
    });
  }



  duplicateVersion(version: VersionBudget) {
    try {
       let duplicatedVersion = JSON.parse(JSON.stringify(version));
       this.versionService.addVersion(this.integration_id!, version).pipe(take(1)).subscribe(resVersion => {
          duplicatedVersion.id = resVersion.id;
          version.categoryList && version.categoryList?.forEach((category, index) => {
            this.categoryService.addCategory(resVersion.id!, category).pipe(take(1)).subscribe(resCategory => {
              duplicatedVersion.categoryList![index].id = resCategory.id;
              category.subCategoryList && category.subCategoryList!.forEach(subCategory => {
                this.subcategoryService.addSubcategory(resCategory.id!, subCategory).pipe(take(1)).subscribe(resSubCategory => 
                  duplicatedVersion.categoryList![index].subCategoryList![index].id = resSubCategory.id
                )
              })
            })
          })
          this.listVersion?.push(duplicatedVersion);
          this.tempVersion = duplicatedVersion;
          console.log(version);
          console.log(duplicatedVersion);
        })
    } catch {
      alert("Error while sending data to server");
    }
  }

  deleteVersionsWithoutMainVersionAndGoToDetailView(){
    forkJoin(this.listVersion!.filter(version => version.id != this.mainVersion?.id)
    .map(version => this.versionService.deleteVersion(version.id!)))
    .subscribe(() =>this.router.navigate([`/${this.integration?.name}`], {state: {id: this.integration?.id}}));
  }

  
}
