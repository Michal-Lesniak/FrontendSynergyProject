import { VersionBudget } from './../../models/versionBudget';
import { ImageService } from './../../services/image/image.service';
import { Version } from '@angular/compiler';
import { SubcategoryService } from './../../services/subcategory/subcategory.service';
import { CategoryService } from './../../services/category/category.service';
import { VersionService } from './../../services/version/version.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseCategory } from 'src/app/models/expense-category';
import { IntegrationService } from 'src/app/services/integration/integration.service';
import { Integration } from 'src/app/models/integration';
import { concatMap, delay, firstValueFrom, forkJoin, take } from 'rxjs';
import { IntegrationDetail } from 'src/app/models/integration-detail';
import { SafeUrl } from '@angular/platform-browser';
import { MatInput } from '@angular/material/input';
import { MatProgressBar } from '@angular/material/progress-bar';
import { ExpenseSubCategory } from 'src/app/models/expense-sub-category';


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



  //function will add Version, first add version via VersionService, then addcategory, subcategory after all, when version is added invoke getVersionFromIntegration 
  //to refresh listVersion
  duplicateVersion(version: VersionBudget) {
    try {
      

      // this.versionService.addVersion(this.integration_id!, version).pipe(
      //   concatMap((resVersion) => {
      //     const categoryObservables = version.categoryList?.map(category => {
      //       return this.categoryService.addCategory(resVersion.id, category).pipe(
      //         concatMap((resCategory) => {
      //           const subCategoryObservables = category.subCategoryList?.map(subCategory => {
      //             return this.subcategoryService.addSubcategory(resCategory.id!, subCategory).pipe(take(1));
      //           }) || [];
      //           return forkJoin(subCategoryObservables);
      //         })
      //       );
      //     }) || [];
      //     return forkJoin(categoryObservables);
      //   }),
      //   concatMap(() => this.versionService.getVersionFromIntegration(this.integration_id!))
      // ).subscribe(res => console.log(res));






      // let resVersion = await firstValueFrom(this.versionService.addVersion(this.integration_id!, version));
      // for(let i=0;i <=  version.categoryList?.length!;i++){
      //   let resCategory = await firstValueFrom(this.categoryService.addCategory(resVersion.id!, version.categoryList![i]));
      //   for(let j=0;j <=  version.categoryList![i].subCategoryList?.length!;j++){
      //     await firstValueFrom(this.subcategoryService.addSubcategory(resCategory.id!, version.categoryList![i].subCategoryList![j]));
      //   }
      // }
      // version.categoryList?.forEach(async category => {
      //   let resCategory = await firstValueFrom(this.categoryService.addCategory(resVersion.id!, category));
      //   for(let j=0;j <=  category.subCategoryList?.length!;j++){
      //     await firstValueFrom(this.subcategoryService.addSubcategory(resCategory.id!, category.subCategoryList![i]));
      //   }

        // category.subCategoryList?.forEach(async subCategory => {

        //   await firstValueFrom(this.subcategoryService.addSubcategory(resCategory.id!, subCategory)).then(res => console.log(res));
        // })
      // })
      // let object = await firstValueFrom(this.versionService.getVersionFromIntegration(this.integration_id!));
      // console.log(object);

       let duplicatedVersion = JSON.parse(JSON.stringify(version));
       this.versionService.addVersion(this.integration_id!, version).subscribe(resVersion => {
          duplicatedVersion.id = resVersion.id;
          version.categoryList && version.categoryList?.forEach((category, index) => {
            this.categoryService.addCategory(resVersion.id!, category).subscribe(resCategory => {
              duplicatedVersion.categoryList![index].id = resCategory.id;
              category.subCategoryList && category.subCategoryList!.forEach(subCategory => {
                this.subcategoryService.addSubcategory(resCategory.id!, subCategory).subscribe(resSubCategory => 
                  duplicatedVersion.categoryList![index].subCategoryList![index].id = resSubCategory.id
                )
              })
            })
          })
          this.listVersion?.push(duplicatedVersion);
          this.tempVersion = duplicatedVersion;
          console.log(version);
          console.log(duplicatedVersion);
          // this.versionService.getVersionFromIntegration(this.integration_id!).subscribe(resList => { 
          //   this.listVersion =  resList;
          //   this.listVersion = this.listVersion.filter(val => val.id != this.mainVersion!.id);
          //   this.tempVersion = this.listVersion.find(val => val.id === resVersion.id);
          // })
        })
    } catch {
      alert("Error while sending data to server");
    }
  }
}
