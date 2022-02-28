
//Defining Formulary class with three properties using class declaration
class Formulary {

    constructor(name,strength,packSize){
        this.name=name;
        this.strength=strength;
        this.packSize=packSize;

    }
 
}

//Defining Inventory class with two properties
class Inventory {

    constructor(name,totalPacks){
        this.name=name;
        this.totalPacks=totalPacks;

    }
}


//This is Pharmacy class where my datasets will be stored in a form of array of objects
/**Note: If the scope of the project allowed I would have stored and fetch data from firebase databse 
and transform this app into web app. I would also integrate redux library to store data in central place, 
hence it is accessible from anywhere in the application. Finally, I would add authentication feature so only 
pharmacist can have access to the data.**/

class Pharmacy {

    #formulary =[];
    #stock=[];

    //This method creates a formulary object and then store  it into formulary array
    _addNewMedicine(name,strength,packSize){

        let medicine = new Formulary(name,strength,packSize);

        //first check if medicine doesn't exist in the formulary then it will be added otherwise it will output error message 
        const found = this.#formulary?.some(med => med.name === name);
        if(!found){
            this.#formulary.push(medicine);
        }else{
         return console.error(`${name} cannot be added to the formulary more than once`);
            
        }
        return medicine;

    }
    //This method returns list of medicine in the formulary showing all medicine information name,strength, and pack size
    _viewMedicine(){
        return this.#formulary?.map(med=> med);
    }

     //This method add new medicine to the stock only if they are in the formulary
    _addNewStock(name,totalPacks){
        
        let medicine = new Inventory(name,totalPacks);

        //first check if the medicine is in the formulary then it is added to the stock otherwise it will output an error message
        const found = this.#formulary?.some(med => med.name === name);
        if(found){
            this.#stock.push(medicine);
        }else{
            return console.error(`Only medicine in the formulary can be added to Stock`);
             
        }

         return medicine;
    }

    //This method returns list of medicine in the stock and quantities
    _viewStock(){
        return this.#stock?.map(medicine=> medicine);
    }

    //This method allow us to add more packs for medicine when new stocks arrive
    //This method was not in the scope of the project but it is a nice feature to have 
    _updateStock(name, pack) {

        //We are not mutating the original object since it's considered a bad programming practice
        const updateMedicine = this.#stock?.map(medicine => {
            if(medicine.name === name ){
                console.log(`${medicine.name} is updated`);
               return {
                    ...medicine,
                    totalPacks:medicine.totalPacks +  pack
                }
            }
            return medicine; 
        } )
        return updateMedicine;
    }
    
    //This method allow us to decrement stock as they are sold
    //This method was also not in the scope of the project but it is a nice feature to have 
    _dispenseMedicine(name,pack){

      //We are not mutating the original object since it's considered a bad programming practice
      const  updateMedicine = this.#stock?.map(medicine => {
          if(medicine.name === name) {
            console.log(`${medicine.name} is updated`);
            return Object.assign({},medicine,{totalPacks:medicine.totalPacks - pack})
          }
          return medicine;
      })
    
      return updateMedicine;
   
    }
}


let pharmacist = new Pharmacy();

/*********** Test Cases ************/
//Adding medicine to the Formulary
pharmacist._addNewMedicine('Paracetamol','500mg',50);
pharmacist._addNewMedicine('Ibuprofen','500mg',50);
pharmacist._addNewMedicine('Amoxicillin','250mg',20);
pharmacist._addNewMedicine('Tramadol','50mg',100);
pharmacist._addNewMedicine('Codeine','30mg',10);
pharmacist._addNewMedicine('Simvastatin','10mg',10);
pharmacist._addNewMedicine('Warfarin','3mg',50);

//print out list of medicine in the formulary
console.table(pharmacist._viewMedicine());

//adding same medicine more than once will result in error message
pharmacist._addNewMedicine('Paracetamol','500mg',50);


/************* Test Cases ***************/
//Adding medicine to the stock 
pharmacist._addNewStock('Amoxicillin', 30);
pharmacist._addNewStock('Ibuprofen', 30);
pharmacist._addNewStock('Paracetamol', 50);
pharmacist._addNewStock('Tramadol', 15);
pharmacist._addNewStock('Codeine', 25);
pharmacist._addNewStock('Simvastatin', 10);
pharmacist._addNewStock('Warfarin', 10);

//It will not allow medicine to be added to the stock if they are not in the formulary
pharmacist._addNewStock('Asprin', 15);

//It print out list of medicine in the stock
console.table(pharmacist._viewStock());

//It will add more packs for the medicine when new stock arrives 
console.table(pharmacist._updateStock('Amoxicillin',20))

//This will decrement packs of the medicine from stock when they are sold 
console.table(pharmacist._dispenseMedicine('Ibuprofen',5));



