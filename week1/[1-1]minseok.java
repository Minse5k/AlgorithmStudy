package minseok_boj_3190;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.util.LinkedList;
import java.util.Queue;


public class Week1 {
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st;
		int mapSize = Integer.parseInt(br.readLine());
		int appleCount = Integer.parseInt(br.readLine());
		
		int[][] mapArray = null;
		mapArray = new int[mapSize][mapSize];
				
		for(int i = 0; i < appleCount; i++) {
			st = new StringTokenizer(br.readLine());
			int x = Integer.parseInt(st.nextToken()) - 1;
			int y = Integer.parseInt(st.nextToken()) - 1;
			mapArray[x][y] = 2;
		}
		
		int rotationCount = Integer.parseInt(br.readLine());
		String[][] rotationArray = null;
		rotationArray = new String[rotationCount][2];
		
		for(int i = 0; i < rotationCount; i++) {
			st = new StringTokenizer(br.readLine());
			String x = st.nextToken();
			String y = st.nextToken();
			rotationArray[i][0] = x;
			rotationArray[i][1] = y;
		}
		int posX = 0;
		int posY = 0;
		Queue<int[]> snakeQueue = new LinkedList<>();
		int[] distX = {1, 0, -1, 0};
		int[] distY = {0, 1, 0, -1};
		int distNow = 0;
		int time = 1;
		boolean checkFinish = false;
		mapArray[0][0] = 1;
		snakeQueue.add(new int[]{posX, posY});
		int distTime = 0;
		
		while(true) {
			if(distTime < rotationCount &&Integer.parseInt(rotationArray[distTime][0]) == time - 1) {
				if(rotationArray[distTime][1].equals("D")) {
					distNow++;
				} else if(rotationArray[distTime][1].equals("L")) {
					distNow--;
					if(distNow == -1) distNow = 3;
				}
				distNow %= 4;
				distTime++;
			}
			int nextPosX = posX + distX[distNow];
			int nextPosY = posY + distY[distNow];
			int[] lastPos = snakeQueue.peek();
			
			if(nextPosX >= mapSize || nextPosY >= mapSize || nextPosX < 0 || nextPosY < 0) {
				checkFinish = true;
			} else {
				if(mapArray[nextPosY][nextPosX] == 0) {
					mapArray[nextPosY][nextPosX] = 1;
					mapArray[lastPos[1]][lastPos[0]] = 0;
					snakeQueue.add(new int[] {nextPosX, nextPosY});
					snakeQueue.remove();
					posX = nextPosX;
					posY = nextPosY;
				} else if(mapArray[nextPosY][nextPosX] == 1) {
					checkFinish = true;
				} else if(mapArray[nextPosY][nextPosX] == 2) {
					mapArray[nextPosY][nextPosX] = 1;
					snakeQueue.add(new int[] {nextPosX, nextPosY});
					posX = nextPosX;
					posY = nextPosY;
				}
			}	
			if(checkFinish == true) {
				break;
			}
			time++;
		}
		System.out.println(time);
	}
}