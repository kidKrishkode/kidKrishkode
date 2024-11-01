#include <stdio.h>  
#include<stdlib.h>  
//code by krish(linklist try)
typedef struct node{  
   int data;  
   struct node *link;  
}nd;
nd *head;  
nd *createNode(int data){ //this function is most importent for this program
	nd *temp;
	temp = (nd*)malloc(sizeof(nd));
	temp->data = data;  
    temp -> link = NULL;  
    return temp;
}
void beginsert(){  
    int element;    
       printf("Enter the value: ");  
       scanf("%d",&element);  
       nd *krish = createNode(element);
       krish->link=head; //just connect the node via head
       head=krish;
       printf("Element inserted successfully\n");         
}  
void lastinsert(){ 
   int element;
       printf("Enter the value: ");  
       scanf("%d",&element);  
       nd *krish = createNode(element);
       nd *temp;
       temp = head;
       while(temp->link!=NULL){ //this loop shift my index at the last position
       	temp=temp->link;
       }
       temp->link=krish;
       krish->link=NULL;
       printf("Element inserted successfully\n");         
}
void anyinsert(){
   int pos=0,element,i,cache=1;
    printf("Enter the position to insert = ");
    scanf("%d",&pos); 
    //check the pos is valid or not
    nd *temp; 
    temp = head;
    while(temp->link!=NULL){ //this loop run for only collect lenth value of the list
       cache = cache + 1;
       temp=temp->link;
    } //lenth of list is cache
    temp=head;
    if(pos>=cache || pos<=0){
      printf("Sorry,position is not valid!\n");
    }else{
      printf("Enter the value: ");
      scanf("%d",&element);
      nd *krish = createNode(element);
      nd *kidKrish; //creat a pointer which is run in case (n-2)
      kidKrish = head;
      temp = head;
      for(i=0; i<pos-2; i++){
        temp = temp->link;
        kidKrish = kidKrish->link;
      }
      temp = temp->link;
      kidKrish->link = krish;
      krish->link = temp;
      printf("Element insert successfully\n");
    }
}
void begdelete(){
    int element;
    nd *temp;
    if(head == NULL){
        printf(" Empty\n");
    }else{ //if the list is not empty then
        element = head->data;
        temp = head;
        head = head->link;
        free(temp); //for better use
        printf("Element delete successfully\n");
    }
}
void lastdelete(){
    int element,i,cache=1;
    nd *temp;
    temp = head;
    if(head == NULL){
        printf(" Empty\n");
    }else{
      while(temp->link!=NULL){ //this loop run for only collect lenth value of the list
        cache = cache + 1;
        temp=temp->link;
      } //lenth of list is cache
      if(cache == 1){
        begdelete();
        return;
      }
      temp = head;
      for(i=0; i<cache-2; i++){ //loop range is first element to n-1 of element
        temp=temp->link;
      }
      temp->link = NULL; //direct linkedlist cutoff statement
      //temp = temp->link;
      printf("Element delete successfully\n");
    }
}
void anydelete(){
    int i,pos=0,cache=1;
    nd* temp = head;
    printf("Enter the position to delete = ");
    scanf("%d",&pos); 
    //check the pos is valid or not
    while(temp->link!=NULL){ //this loop run for only collect lenth value of the list
       cache = cache + 1;
       temp=temp->link;
    } //lenth of list is cache
    temp=head;
    if(pos>=cache || pos<=0){
      printf("Sorry,position is not valid!\n");
    }else{
        if(pos == 1){
            begdelete(); //for first position
        }else{ 
            for (i=0; i<pos-2; i++){
                temp = temp->link; 
            }
            nd* krish = temp->link; //creat a new pointer
            temp->link = temp->link->link;
            krish->link = NULL; 
            free(krish);
            printf("Element delete successfully\n");
        }
    }
}
void alldelete(){
    int element;
    nd *temp;
    temp = head;
    while(head != NULL){
      lastdelete(); //call the pre def function to save time and space
    }
}
void display(){  
    nd *temp;  
    temp=head;  
    printf("Stack element is =  \n");
    if(temp == NULL){  
        printf("  Empty\n");  
    }else{
        printf(" Start->"); //this statement given for styling the output
        while(temp!=NULL){  
            printf("%d->",temp->data);  
            temp = temp->link;  
        }  
        printf("End\n"); //this statement given for styling the output
    }  
}  
void choiceHolder(){
	int choice=0;    
    while(1){
        printf("\nEnter your choice = ");        
        scanf("%d",&choice);
        if(choice == 0){ //hidden choice
            alldelete();  
        }else if(choice == 1){
        	beginsert();
        }else if(choice == 2){
        	lastinsert();
        }else if(choice == 3){
        	anyinsert();
        }else if(choice == 4){
        	display();
        }else if(choice == 5){
        	begdelete();
        }else if(choice == 6){
        	lastdelete();
        }else if(choice == 7){
        	anydelete();
        }else if(choice == 8){
        	printf("\n  exit()\n");
            break;//or return 0;
        }else{
            printf("Invalid choice taken\nTry again!\n");
            choiceHolder(); //This line written to classic return statement, when while(choice != 8);
        }
    }
}
int main(){  //the main function display the menu box items
    printf("\n\t\tMenu\n----------------------------------------------\n");
    printf("Press 1 to insert at beginning position\nPress 2 to insert at last position\nPress 3 to insert at any position\n");
    printf("Press 4 to Display the list\n");
    printf("Press 5 to delete at beginning position\nPress 6 to delete at last position\nPress 7 to delete at any position\n");
    printf("Press 8 to Quit\n");  
    printf("----------------------------------------------\n");
    choiceHolder(); //Only one function call by main
        
    return 0;
}  







/*Source- https://github.com/Krishnendu-Mitra/linkedlist.git */
